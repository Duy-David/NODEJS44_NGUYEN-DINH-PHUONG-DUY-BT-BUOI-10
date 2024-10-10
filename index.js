import express from "express";
import cors from "cors";
import rootRouter from "./src/routes/root.router.js";
const app = express();
const port = 8080;

app.use(express.json());

app.use(cors());

app.use(rootRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/testapi", (req, res) => {
  res.send("Test");
});

app.listen(port, () => {
  console.log(`Server starts with port ${port}`);
});
