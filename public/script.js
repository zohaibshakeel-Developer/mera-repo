async function generateMedia(type) {
  const prompt = document.getElementById("prompt").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "⏳ Generating...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        type: type   // <-- IMPORTANT (image or video)
      })
    });

    const data = await response.json();

    if (!data.success) {
      resultDiv.innerHTML = "❌ Error: " + data.error;
      return;
    }

    // Image or video display
    if (type === "image") {
      resultDiv.innerHTML = `<img src="${data.output}" style="max-width:100%;">`;
    } else {
      resultDiv.innerHTML = `<video src="${data.output}" controls style="max-width:100%;"></video>`;
    }

  } catch (error) {
    resultDiv.innerHTML = "❌ Request failed: " + error.message;
  }
}
