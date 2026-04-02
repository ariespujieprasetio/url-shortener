const express = require("express");
const { shortenUrl } = require("./service");
const repo = require("./repository");
const path = require("path");

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const BASE_URL = "http://localhost:3000";

app.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;
    const result = await shortenUrl(url);
    res.json({
      shortUrl: `${BASE_URL}/${result.shortCode}`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/:code", async (req, res) => {
  const data = await repo.findByShortCode(req.params.code);
  if (!data) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.redirect(data.original_url);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
