if (mode === "image") {
  const output = await replicate.run(
    "stability-ai/stable-diffusion-2-1",
    { input: { prompt, width: 768, height: 768 } }
  );
  return res.json({ type: "image", url: output[0] });
}

if (mode === "video") {
  const output = await replicate.run(
    "anotherjesse/zeroscope-v2-xl",
    { input: { prompt } }
  );
  return res.json({ type: "video", url: output });
}
