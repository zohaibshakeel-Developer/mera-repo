async function generate() {
    const prompt = document.getElementById("prompt").value;
    const resultBox = document.getElementById("result");

    resultBox.innerHTML = "⏳ Generating...";

    try {
        const res = await fetch("/api/generate", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();

        if (!res.ok) {
            resultBox.innerHTML = "❌ Error: " + data.error;
            return;
        }

        if (data.image) {
            resultBox.innerHTML = `<img src="${data.image}" width="300" alt="AI Image"/>`;
        } else {
            resultBox.innerHTML = "❌ No image returned!";
        }

    } catch (err) {
        resultBox.innerHTML = "❌ Request failed: " + err.message;
    }
}


