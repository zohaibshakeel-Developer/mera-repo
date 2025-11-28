import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt missing" });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY
    });

    const output = await replicate.run(
      "stability-ai/stable-diffusion-2-1",
      { input: { prompt } }
    );

    return res.status(200).json({ output });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
