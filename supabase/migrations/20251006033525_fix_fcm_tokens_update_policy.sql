-- Drop the old, overly restrictive update policy
DROP POLICY "Users can update their own FCM tokens" ON public.fcm_tokens;

-- Create the new, correct update policy for upsert
CREATE POLICY "Users can update FCM tokens"
ON public.fcm_tokens
FOR UPDATE
USING (true)
WITH CHECK (auth.uid() = user_id);
