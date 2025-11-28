import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed ❌" });
  }

  try {
    const { prompt, mode } = req.body;

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY
    });

    // IMAGE GENERATION ✅
    if (mode === "image") {
      const output = await replicate.run(
        "black-forest-labs/flux-schnell",
        { input: { prompt, width: 768, height: 768 } }
      );

      return res.status(200).json({ type: "image", url: output });
    }

    // VIDEO GENERATION ✅ (working model)
    if (mode === "video") {
      const output = await replicate.run(
        "tencent/hunyuan-video",
        { input: { prompt, duration: 5 } }
      );

      return res.status(200).json({ type: "video", url: output });
    }

    return res.status(400).json({ error: "Invalid mode selected 🚫" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Generation failed: " + err.message });
  }
}
