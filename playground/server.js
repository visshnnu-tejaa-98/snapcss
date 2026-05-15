require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname)));

// Serve dist from root for the CDN-style import
app.use("/dist", express.static(path.join(__dirname, "..", "dist")));

app.listen(PORT, () => {
  console.log(`snapcss playground running at http://localhost:${PORT}`);
});
