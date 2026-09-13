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

How to deploy on Vercel
1. Import this repository into Vercel (https://vercel.com/new)
2. Set the environment variables in the Vercel project settings
3. Deploy — Vercel will detect serverless functions in /api and host them automatically

Notes & next steps
- The exact input fields sent to Replicate depend on the model version you pick. If you select a specific text→video model on Replicate, update the server code (api/generate.js) to match the model's accepted input shape.
- No API keys were committed. Add them to Vercel or your repository secrets.
- If you want me to change the provider (Runway, a paid provider, or a custom model), I can adapt the same endpoints.

Testing locally (optional)
- You can use Vercel CLI (`vercel dev`) to run the serverless functions locally. Ensure your environment variables are present when testing.

