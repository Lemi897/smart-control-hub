const express = require("express");
const scanNetwork = require("./scanner");

const app = express();
const PORT = 3000;

// Test route
app.get("/", (req, res) => {
  res.send("Smart Control Hub backend running 🚀");
});

// Scan route
app.get("/api/scan", async (req, res) => {
  const devices = await scanNetwork();
  res.json({
    count: devices.length,
    devices,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
