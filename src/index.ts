import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT ?? "8000";

app.get("/", (req, res) => {
  console.log("Request received.....");
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  return res.send("Hello from test route");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
