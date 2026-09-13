// Updated scripts.js — client side integration with /api/generate and /api/status
const generateBtn = document.getElementById("generateBtn");
const promptBox = document.getElementById("prompt");
const statusBox = document.getElementById("status");

const videoPlayer = document.getElementById("videoPlayer");
const placeholder = document.getElementById("placeholder");
const downloadBtn = document.getElementById("downloadBtn");

async function pollStatus(predictionId) {
  // Poll every 3 seconds until succeeded or failed
  while (true) {
    const res = await fetch(`/api/status?id=${encodeURIComponent(predictionId)}`);
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Status check failed: ${errText}`);
    }
    const data = await res.json();

    const status = data.status || (data.state && data.state.phase) || "unknown";
    statusBox.textContent = `Status: ${status}`;

    if (status === "succeeded" || status === "completed") {
      // Replicate typically returns data.output which may be an array of URLs
      const output = data.output || data.result || null;
      let url = null;

      if (Array.isArray(output) && output.length) url = output[0];
      else if (typeof output === "string") url = output;
      else if (output && output[0]) url = output[0];

      return { data, url };
    }

    if (status === "failed") {
      throw new Error("Generation failed: " + JSON.stringify(data));
    }

    // Wait
    await new Promise((r) => setTimeout(r, 3000));
  }
}

generateBtn.addEventListener("click", async () => {
  const prompt = promptBox.value.trim();

  if (!prompt) {
    statusBox.textContent = "Please describe the video you want to create.";
    return;
  }

  const style = document.getElementById("style").value;
  const ratio = document.getElementById("ratio").value;
  const duration = document.getElementById("duration").value;

  generateBtn.disabled = true;
  generateBtn.textContent = "⏳ Generating...";

  statusBox.textContent = `Preparing your ${style} video (${ratio}, ${duration}s)...`;

  try {
    const resp = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, style, ratio, duration }),
    });

    if (!resp.ok) {
      const err = await resp.json();
      statusBox.textContent = `Error: ${err.error || JSON.stringify(err)}`;
      generateBtn.disabled = false;
      generateBtn.textContent = "✨ Generate Video";
      return;
    }

    const prediction = await resp.json();

    // The prediction object usually contains an `id`.
    const id = prediction.id || prediction.uuid || prediction.request_id;
    if (!id) {
      statusBox.textContent = "No prediction id returned from server.";
      generateBtn.disabled = false;
      generateBtn.textContent = "✨ Generate Video";
      return;
    }

    statusBox.textContent = `Job started (id: ${id}). Polling for status...`;

    const { url } = await pollStatus(id);

    if (!url) {
      statusBox.textContent = "Generation completed but no video URL was returned.";
      generateBtn.disabled = false;
      generateBtn.textContent = "✨ Generate Video";
      return;
    }

    // Show video
    placeholder.style.display = "none";
    videoPlayer.style.display = "block";
    videoPlayer.src = url;
    downloadBtn.style.display = "block";
    downloadBtn.href = url;

    statusBox.textContent = "Your video is ready!";
  } catch (err) {
    console.error(err);
    statusBox.textContent = `Error: ${err.message}`;
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "✨ Generate Video";
  }
});
