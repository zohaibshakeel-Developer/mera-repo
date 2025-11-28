async function generate(type) {
  const prompt = document.getElementById("prompt").value;
  const resultBox = document.getElementById("result");
  resultBox.innerHTML = "⏳ Generating...";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, type }),
    });

    const data = await res.json();

    if (!data.success) {
      resultBox.innerHTML = "❌ Error: " + data.error;
      return;
    }

    // Image result
    if (type === "image") {
      resultBox.innerHTML = `<img src="${data.output}" style="max-width:300px;">`;
    }

    // Video result
    if (type === "video") {
      resultBox.innerHTML = `<video controls width="350"><source src="${data.output}" /></video>`;
    }

  } catch (e) {
    resultBox.innerHTML = "❌ " + e.message;
  }
}
