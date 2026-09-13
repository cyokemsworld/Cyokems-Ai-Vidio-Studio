# Cyokems AI Video Studio — Vercel deployment (serverless)

This branch adds serverless API endpoints and client wiring to deploy the project on Vercel and integrate with Replicate (text → video models).

What was added
- /api/generate (serverless) — starts a Replicate prediction
- /api/status (serverless) — polls Replicate for prediction status
- Updated scripts.js — uses the new endpoints to start jobs and show resulting videos
- vercel.json — Vercel config

Environment variables (required)
- REPLICATE_API_TOKEN — Your Replicate API token
- REPLICATE_MODEL_VERSION — The Replicate model *version* id to use for text→video. Replicate requires a model version id (not the human-friendly model name).

Optional security
- API_KEY — If you set this in Vercel, the serverless endpoints will require an `X-API-KEY` header with this value. This protects the endpoints from casual abuse.

Important security note
- If you embed an API key in the client (for example by adding a meta tag `<meta name="x-api-key" content="...">` to index.html), that key will be public and anyone can use it. Recommended usage:
  - Use API_KEY to protect endpoints and call them from a trusted backend or from server-rendered pages.
  - For a public frontend, consider implementing a user authentication flow and issuing short-lived tokens on the server-side.

How to deploy on Vercel
1. Import this repository into Vercel (https://vercel.com/new)
2. Set the environment variables in the Vercel project settings
   - REPLICATE_API_TOKEN = <your replicate token>
   - REPLICATE_MODEL_VERSION = <the model version id>
   - (optional) API_KEY = <a secret string> — add this to protect /api endpoints
3. Deploy — Vercel will detect serverless functions in /api and host them automatically

How to test with API_KEY set
- If you set API_KEY on the server, you have two main ways to call the endpoints:
  1) From a trusted server-side environment that can keep the key secret.
  2) (Insecure) Add the key to your frontend via a meta tag in index.html for quick testing only:
     `<meta name="x-api-key" content="<YOUR_KEY_HERE>">`
     This will cause the frontend (scripts.js) to include the `X-API-KEY` header automatically.

Notes & next steps
- The exact input fields sent to Replicate depend on the model version you pick. If you select a specific text→video model on Replicate, update api/generate.js to match the model's accepted input shape.
- No API keys were committed. Add them to Vercel or your repository secrets.
- If you want me to change the provider (Runway, a paid provider, or a custom model), I can adapt the same endpoints.

Testing locally (optional)
- You can use Vercel CLI (`vercel dev`) to run the serverless functions locally. Ensure your environment variables are present when testing.

