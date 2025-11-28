import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY
    });

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      { input: { prompt } }
    );

    res.json({ image: output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

