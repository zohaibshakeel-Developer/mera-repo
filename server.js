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

    let model = "";
    let input = {};

    if (type === "image") {
      model = "black-forest-labs/flux-schnell";
      input = {
        prompt: prompt,
      };
    }

    if (type === "video") {
      model = "tencent/hunyuan-video";
      input = {
        prompt: prompt,
        aspect_ratio: "16:9"
      };
    }

    const output = await replicate.run(model, { input });

    res.json({ success: true, output });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default app;

