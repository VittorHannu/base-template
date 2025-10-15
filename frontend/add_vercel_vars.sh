#!/bin/bash

# This script adds the necessary Firebase environment variables to your Vercel project for the Production environment.
# It pipes the values into the 'vercel env add' command to avoid interactive prompts.

echo 'AIzaSyCSN0Cvu8XhVFkVv94o2TV0DjX-aW57MpU' | vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
echo 'food-tracker-ad8e5.firebaseapp.com' | vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production
echo 'food-tracker-ad8e5' | vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production
echo 'food-tracker-ad8e5.appspot.com' | vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production
echo '657389030077' | vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production
echo '1:657389030077:web:373095748bf4628aef45d4' | vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production
echo 'G-5NCHSQTKVP' | vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID production
echo 'BH6H4n_KEzA3NxX4VfeWp2l_OE1hVQfQnKJFVG2bwrYb0C0EtyKfiOIwwYvwBjYK2lZ7yuRSPNfVJ-CsYmriprw' | vercel env add NEXT_PUBLIC_VAPID_KEY production

echo "
All 8 environment variables have been added to the Production environment."
