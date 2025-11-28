import Replicate from "replicate";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

app.get("/", (req, res) => {
  res.send("🔥 Zohaib AI Backend Running!");
});

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, type } = req.body;

    if (!prompt || !type) {
      return res.status(400).json({ error: "Missing prompt or type" });
    }

    let model = "";
    let input = {};

    // ---------------- IMAGE MODEL ---------------- //
    if (type === "image") {
      model = "black-forest-labs/flux-schnell:0.1.0";
      input = { prompt };
    }

    // ---------------- VIDEO MODEL ---------------- //
    if (type === "video") {
      model = "stability-ai/stable-video-diffusion-img2vid-xt:latest";
      input = {
        prompt,
        num_frames: 25
      };
    }

    const output = await replicate.run(model, { input });

    res.json({ success: true, output });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default app;
