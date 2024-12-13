import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import moduleRouter from "./src/routes/moduleRouter.js";

const app = express();
const port = 3010;

app.use(bodyParser.json());
app.use(cors());
app.use("/api/modules", moduleRouter);

app.get("/", (req, res) => {
  res.send("Hello Gestion Apprenant!");
});

app.listen(port, () => {
  console.log(`Application démarrée sur le port ${port}`);
});
