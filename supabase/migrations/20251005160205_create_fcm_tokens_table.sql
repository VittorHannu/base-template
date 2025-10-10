-- Create the table for storing FCM registration tokens
CREATE TABLE public.fcm_tokens (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add a comment to the table
COMMENT ON TABLE public.fcm_tokens IS 'Stores FCM registration tokens for push notifications.';
