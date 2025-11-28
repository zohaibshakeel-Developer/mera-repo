async function generate() {
  const prompt = document.getElementById("prompt").value;
  document.getElementById("output").innerHTML = "⏳ Generating...";

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();

  if (data.image) {
    document.getElementById("output").innerHTML = `
      <img src="${data.image}" style="max-width:400px;border-radius:10px;" />
    `;
  } else {
    document.getElementById("output").innerHTML = "❌ Error generating image";
  }
}
