-- Step 1: Drop all existing policies on the tables to ensure a clean state.
DROP POLICY IF EXISTS "Users can insert their own FCM tokens" ON public.fcm_tokens;
DROP POLICY IF EXISTS "Users can update their own FCM tokens" ON public.fcm_tokens;
DROP POLICY IF EXISTS "Users can update FCM tokens" ON public.fcm_tokens;
DROP POLICY IF EXISTS "Users can queue notifications for themselves" ON public.notifications_queue;

-- Step 2: Create the definitive, secure policies.

-- For fcm_tokens table: Allows users to fully manage their own tokens.
CREATE POLICY "Users can manage their own FCM tokens"
ON public.fcm_tokens
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- For notifications_queue table: Allows users to insert notifications for themselves.
CREATE POLICY "Users can queue notifications for themselves"
ON public.notifications_queue
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = target_user_id);
