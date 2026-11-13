# Harsh Yadav — Portfolio v2

A responsive, interactive Next.js portfolio with a draggable 3D-style project carousel, video/design filters, interactive archive folders, creative desk, timeline and contact section.

## Run locally
- Install Node.js 20+
- Run `npm install`
- Run `npm run dev`
- Open http://localhost:3000

## Before public launch
1. Replace the CSS concept previews with real project thumbnails / showreels.
2. Add real project links and case-study credits.
3. Replace `YOUR_EMAIL_HERE` in `app/page.tsx` with your actual email.
4. Confirm the listed brand credits and your exact role on each project.
5. Add your Instagram URL.

## Deploy
Push this folder to GitHub, import the repository at https://vercel.com/new, then deploy using the detected Next.js settings. Set the free Vercel domain in Project → Settings → Domains. `harshyadav.vercel.app` is subject to availability.

## AI video gallery
The AI Videos section lists the 26 portfolio clips and filters them by format. For local playback, `public/videos` is linked to `/Users/harshyadav/Documents/Harsh Yadav/Portfolio Videos`, so the originals stay in place. That local link is specific to this Mac; before deploying, upload the clips to a video host or copy them into the deployment's supported media storage and update the video URLs.
