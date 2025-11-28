async function generateMedia(mode) {
    const prompt = document.getElementById("prompt").value;
    const resultBox = document.getElementById("result");

    resultBox.innerHTML = "⏳ Generating " + mode + "...";

    try {
        const res = await fetch("/api/generate", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ prompt, mode })
        });

        const data = await res.json();

        if (!res.ok) {
            resultBox.innerHTML = "❌ Error: " + data.error;
            return;
        }

        if (data.type === "image") {
            resultBox.innerHTML = `<img src="${data.url}" width="300"/>`;
        }

        if (data.type === "video") {
            resultBox.innerHTML = `<video width="300" controls><source src="${data.url}" type="video/mp4"></video>`;
        }

    } catch (err) {
        resultBox.innerHTML = "❌ Request failed: " + err.message;
    }
}



