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

    // FREE IMAGE MODEL
    if (type === "image") {
      model = "stability-ai/sdxl";
      input = { prompt };
    }

    // FREE VIDEO MODEL
    if (type === "video") {
      model = "cmu-facediffusion/svd";
      input = {
        prompt,
        num_frames: 20,
        fps: 8
      };
    }

    const output = await replicate.run(model, { input });

    res.json({ success: true, output });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.listen(3000, () => console.log("🔥 Server running on port 3000"));
export default app;
