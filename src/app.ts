import express from "express";
import userRoute from "./http/controllers/user/route";

const app = express();

app.use(express.json());

app.use("/api/v1/health", (request, response) => {
  response.status(200).json({
    message: "health",
  });
});

app.use("/api/v1/", userRoute);

export default app;
