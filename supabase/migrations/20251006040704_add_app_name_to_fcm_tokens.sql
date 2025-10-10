-- Clear existing test data from the table before altering the schema
DELETE FROM public.fcm_tokens;

-- Add the app_name column to distinguish tokens from different apps.
ALTER TABLE public.fcm_tokens
ADD COLUMN app_name TEXT NOT NULL;

-- Drop the old unique constraint on just the token column.
-- Note: The constraint name 'fcm_tokens_token_key' is the default generated name.
-- If this fails, the constraint may have a different name.
ALTER TABLE public.fcm_tokens
DROP CONSTRAINT fcm_tokens_token_key;

-- Add a new unique constraint on the combination of token and app_name.
-- This allows the same device token to be registered for multiple apps.
ALTER TABLE public.fcm_tokens
ADD CONSTRAINT fcm_tokens_token_app_name_key UNIQUE (token, app_name);
