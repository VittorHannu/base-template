-- Create the table to act as a queue for sending notifications
CREATE TABLE public.notifications_queue (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    target_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    source_app TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add a comment to the table
COMMENT ON TABLE public.notifications_queue IS 'Acts as a queue. Inserting a row triggers a notification to be sent.';
