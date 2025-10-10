import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.2/mod.ts";

// Helper function to get a Google Auth Token for FCM API
async function getGoogleAuthToken(projectId: string, clientEmail: string, privateKey: string) {
  if (!clientEmail || !privateKey || !projectId) {
    console.error("Firebase service account credentials are not set correctly for the app.");
    throw new Error("Firebase service account credentials are not set correctly for the app.");
  }

  const jwt = await create(
    { alg: "RS256", typ: "JWT" },
    {
      scope: "https://www.googleapis.com/auth/firebase.messaging",
      aud: "https://oauth2.googleapis.com/token",
      iss: clientEmail,
      iat: getNumericDate(0),
      exp: getNumericDate(3600), // Token is valid for 1 hour
    },
    privateKey.replace(/\\n/g, "\n")
  );

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Failed to get Google Auth Token:", data);
    throw new Error(`Failed to get auth token: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { record: notification } = await req.json();
    const { target_user_id, title, body, source_app } = notification;

    if (!target_user_id) throw new Error("`target_user_id` is required.");
    if (!source_app) throw new Error("`source_app` is required to select credentials.");

    // Select credentials based on the source app
    let projectId, clientEmail, privateKey;
    const appPrefix = source_app.toUpperCase().replace(/-/g, '_'); // e.g., 'study-tracker' -> 'STUDY_TRACKER'

    projectId = Deno.env.get(`${appPrefix}_FIREBASE_PROJECT_ID`);
    clientEmail = Deno.env.get(`${appPrefix}_FIREBASE_CLIENT_EMAIL`);
    privateKey = Deno.env.get(`${appPrefix}_FIREBASE_PRIVATE_KEY`);

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(`Credentials for source_app '${source_app}' not found.`);
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: tokens, error: tokenError } = await supabaseAdmin
      .from("fcm_tokens")
      .select("token")
      .eq("user_id", target_user_id)
      .eq("app_name", source_app);

    if (tokenError) throw tokenError;

    if (!tokens || tokens.length === 0) {
      console.log(`No FCM tokens found for user ${target_user_id} and app ${source_app}.`);
      return new Response(JSON.stringify({ message: "No FCM tokens for user and app." }), { status: 200 });
    }

    const fcmTokens = tokens.map(t => t.token);
    const accessToken = await getGoogleAuthToken(projectId, clientEmail, privateKey);

    for (const token of fcmTokens) {
      const fcmUrl = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;
      const message = {
        message: {
          token: token,
          notification: {
            title: title || "Nova Notificação",
            body: body || "Você tem uma nova mensagem.",
          },
        },
      };

      fetch(fcmUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(message),
      }).then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          console.error(`[FCM Send Error] Failed to send to token ${token}:`, errorData);

          // If the token is unregistered, delete it from the database
          const isUnregistered = errorData.error?.details?.some(
            (d: any) => d.errorCode === "UNREGISTERED"
          );

          if (isUnregistered) {
            console.log(`[DB Cleanup] Deleting unregistered token: ${token}`);
            await supabaseAdmin
              .from('fcm_tokens')
              .delete()
              .eq('token', token);
          }
        } else {
          console.log(`[FCM Send Success] Successfully sent to token ${token}`);
        }
      }).catch(e => console.error("[FCM Fetch Error]:", e));
    }

    return new Response(JSON.stringify({ success: true, message: "Notification process initiated." }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in Edge Function:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
