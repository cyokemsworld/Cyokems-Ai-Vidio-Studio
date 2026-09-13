// api/status.js
// Serverless function to return the status of a Replicate prediction
// Query: /api/status?id=<prediction-id>
// Optional security: if API_KEY is set in env, the function will require header `X-API-KEY`.

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // API key check (optional)
  const serverApiKey = process.env.API_KEY;
  if (serverApiKey) {
    const clientKey = req.headers["x-api-key"];
    if (!clientKey || clientKey !== serverApiKey) {
      res.status(401).json({ error: "Unauthorized: missing or invalid API key" });
      return;
    }
  }

  const id = req.query.id;
  if (!id) {
    res.status(400).json({ error: "Missing id query parameter" });
    return;
  }

  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    res.status(500).json({ error: "REPLICATE_API_TOKEN not configured" });
    return;
  }

  try {
    const resp = await fetch(`https://api.replicate.com/v1/predictions/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Token ${token}` },
    });

    const data = await resp.json();
    if (!resp.ok) {
      res.status(502).json({ error: "Replicate API error", details: data });
      return;
    }

    // The `data` object contains status: starting/processing/succeeded/failed and possibly `output`.
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unexpected error", details: String(err) });
  }
}
