const express = require("express");

const app = express();

app.use(express.static("./app"));

app.all("*", (req, res) => {
  res.sendFile(__dirname + "/app/index.html");
});

const PORT = process.env.PORT || 4111;
// eslint-disable-next-line
app.listen(PORT, function () {
  const { address, port } = this.address();
  const server = `http://${address === "::" ? "0.0.0.0" : address}:${port}`;
  // eslint-disable-next-line
  console.log("\n\nServer Started ON:", "\x1b[36m\x1b[89m", server);
  // eslint-disable-next-line
  console.log("Press Ctrl+C to quit.");
});
