const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const filePath = path.join(__dirname, "messages.json");

app.post("/save", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.json({ success: false, msg: "Name & Message required" });
  }

  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath));
  }

  data.push({ name, message, time: new Date().toLocaleString() });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.json({ success: true, msg: "✅ Sent successfully!" });
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
