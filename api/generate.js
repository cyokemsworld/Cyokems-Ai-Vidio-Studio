// api/generate.js
// Vercel Serverless Function to create a Replicate prediction for text->video.
// Environment variables required:
// - REPLICATE_API_TOKEN: your Replicate API token
// - REPLICATE_MODEL_VERSION: the model version id to use (Replicate version ID)
// Optional security:
// - API_KEY: if set, the function will require the request to include header `X-API-KEY` with this value.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Simple API key protection (optional): if API_KEY is set in env, require header
  const serverApiKey = process.env.API_KEY;
  if (serverApiKey) {
    const clientKey = req.headers["x-api-key"];
    if (!clientKey || clientKey !== serverApiKey) {
      res.status(401).json({ error: "Unauthorized: missing or invalid API key" });
      return;
    }
  }

  const { prompt, style, ratio, duration } = req.body || {};

  if (!prompt) {
    res.status(400).json({ error: "Missing prompt" });
    return;
  }

  const token = process.env.REPLICATE_API_TOKEN;
  const modelVersion = process.env.REPLICATE_MODEL_VERSION; // required

  if (!token || !modelVersion) {
    res.status(500).json({
      error:
        "Server not configured. Set REPLICATE_API_TOKEN and REPLICATE_MODEL_VERSION in your environment.",
    });
    return;
  }

  try {
    const body = {
      version: modelVersion,
      input: {
        prompt,
        // Pass additional structured inputs — the exact field names depend on the chosen model version.
        // Many text->video models accept `prompt` and optional params; adjust when you pick a concrete model.
        style: style || "Cinematic",
        ratio: ratio || "16:9",
        duration: duration || "10",
      },
    };

    const resp = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await resp.json();

    if (!resp.ok) {
      res.status(502).json({ error: "Replicate API error", details: data });
      return;
    }

    // Return the prediction object so the client can poll by id
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unexpected error", details: String(err) });
  }
}
