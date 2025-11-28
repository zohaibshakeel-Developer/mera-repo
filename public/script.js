async function generateMedia(type) {
  const prompt = document.getElementById("prompt").value;
  const result = document.getElementById("result");

  result.innerHTML = "⏳ Generating...";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, type })
    });

    const data = await res.json();

    if (!data.success) {
      result.innerHTML = "❌ Error: " + data.error;
      return;
    }

    if (type === "image") {
      result.innerHTML = `<img src="${data.output[0]}" width="400">`;
    }

    if (type === "video") {
      result.innerHTML = `<video src="${data.output}" width="400" controls></video>`;
    }

  } catch (err) {
    result.innerHTML = "❌ Request failed: " + err.message;
  }
}
