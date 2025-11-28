document.getElementById("generateBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  const outputImg = document.getElementById("outputImg");
  outputImg.src = "";

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();

  if (data.image) {
    outputImg.src = data.image;
  }
});
