import express from "express";
import mongoose from "mongoose";
import { checkLoggedIn } from "./services/middleware.js";
import userRouter  from "./controllers/user.controller.js";
import { createUser, findOneUser } from "./services/user.service.js";
import jwt from "jsonwebtoken";
import { deleteProfile, updateProfile } from "./services/profile.service.js";

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(checkLoggedIn);
// app.use("/user", userRouter);
// console.log("🚀 ~ userRouter:", userRouter)

mongoose
  .connect(
    "mongodb+srv://cananhminh:Anhminhcam89@cluster0.0vaoaea.mongodb.net/"
  )
  .then(() => console.log("connected!!"))
  .catch((err) => console.log("error: ", err));
app.listen(PORT, console.log(`running in http//localhost:${8080}`));
//
app.post("/create-user", async (req, res) => {
    const user = await createUser(req.body);
    console.log("🚀 ~ userRouter.post ~ user:", user);
    res.json(user);
  });

//
//api danh nhap
app.post("/login", () => {
  //get email & password form req
  const { email, password } = body;
  //find user from database by email
  const userLogin = findOneUser({ email, password });
  //if user existed
  if (userLogin) {
    //create payload
    const payload = {
      email,
      name,
      birth,
      address,
      nation,
    };
    const token = jwt.sign(payload, "do not see", { expiresIn: "1h" });
    res.json({ token });
  }
  //if user not found
  else {
    res.json("user not found!!!!");
  }
});

// sua xoa ho so ca nhan theo token
app.put("/update-profile", async (req, res) => {
  //get token from req.headers
  const tokenFromReq = req.headers.authorization;
  //loai bo "Bearer "
  const token = tokenFromReq.split(" ", [1]);
  //verify token
  const tokenVerified = jwt.verify(token, "do not see");
  //if token valid
  if (tokenVerified) {
    const profile = await updateProfile(req.params, req.body);
    res.json(profile);
  } else {
    res.json("token invalid");
  }
});

//api xoa profile
app.delete("/delete-profile/:id", async (req, res) => {
  const tokenFromReq = req.headers.authorization;
  //loai bo "Bearer "
  const token = tokenFromReq.split(" ", [1]);
  //verify token
  const tokenVerified = jwt.verify(token, "do not see");
  //if token valid
  if (tokenVerified) {
    const profileId = req.params.id;
    const profile = await deleteProfile(profileId, () => {
      if (err) {
        res.json("err: ", err);
      } else {
        res.json("delete profile successfully");
      }
    });
  } else {
    res.json("token invalid");
  }
});
