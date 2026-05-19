const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <h1>Matrix Testing</h1>
    <p>Node Version: <b>${process.version}</b></p>
    <p>Environment: <b>${process.env.NODE_ENV || "development"}</b></p>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Node version: ${process.version}`);
});
