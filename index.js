import express from "express";
import mongoose from "mongoose";
import userRouter from "./controllers/user.controller.js";
import profileRouter from "./controllers/profile.controller.js";

const PORT = 3080;
const app = express();
app.use(express.json());
app.use("/user", userRouter); 
app.use("/profile", profileRouter);


mongoose
  .connect(
    "mongodb+srv://cananhminh:Anhminhcam89@cluster0.0vaoaea.mongodb.net/"
  )
  .then(() => console.log("connected!!"))
  .catch((err) => console.log("error: ", err));
app.listen(PORT, console.log(`running in http//localhost:${PORT}`));
