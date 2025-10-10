-- 1. Enable RLS on the tables
ALTER TABLE public.fcm_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications_queue ENABLE ROW LEVEL SECURITY;

-- 2. Create policies for fcm_tokens
-- Users can insert their own tokens
CREATE POLICY "Users can insert their own FCM tokens"
ON public.fcm_tokens
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own tokens (needed for upsert)
CREATE POLICY "Users can update their own FCM tokens"
ON public.fcm_tokens
FOR UPDATE USING (auth.uid() = user_id);

-- 3. Create policy for notifications_queue
-- Users can queue notifications for themselves
CREATE POLICY "Users can queue notifications for themselves"
ON public.notifications_queue
FOR INSERT WITH CHECK (auth.uid() = target_user_id);
