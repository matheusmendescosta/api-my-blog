import express from "express";

const app = express();

app.use(express.json());

app.use("/health", (req, res) => {
  res.status(200).json({
    msg: "Health Check",
  });
});

export default app;
