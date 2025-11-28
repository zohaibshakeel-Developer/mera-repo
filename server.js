require("dotenv").config();
const express = require("express");
const Replicate = require("replicate");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

// IMAGE GENERATE API
app.post("/api/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const output = await replicate.run(
      "black-forest-labs/flux-pro:8ddc3e13ba97539e67ad97742d32df8a84e673de0bd5b79f6a37b319a5aa181e",
      {
        input: {
          prompt,
          steps: 30,
          guidance: 3,
        },
      }
    );

    res.json({ image: output[0] });
  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on 3000"));
