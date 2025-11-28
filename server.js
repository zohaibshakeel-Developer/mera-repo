import express from "express";
import cors from "cors";
import Replicate from "replicate";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const output = await replicate.run(
      "black-forest-labs/flux-schnell:62294d7c-0f3e-49f1-ae0d-235ca7e6c52b",
      {
        input: {
          prompt,
          width: 512,
          height: 512,
        }
      }
    );

    res.json({ image: output[0] });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("🔥 Server running on port 3000"));
