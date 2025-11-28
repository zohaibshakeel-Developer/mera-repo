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
      model = "stability-ai/stable-diffusion-xl-base-1.0";
      input = { prompt };
    }

    if (type === "video") {
      model = "zunxbt/zeroscope-v2-xl";
      input = { prompt };
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
