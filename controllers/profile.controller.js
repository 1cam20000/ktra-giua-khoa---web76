import express from "express";
import { checkLoggedIn } from "../services/middleware.js";
import {
  createProfile,
  updateProfile,
} from "../services/profile.service.js    ";
import { deleteProfile } from "../services/profile.service.js";
import jwt from "jsonwebtoken";

const profileRouter = express.Router();
profileRouter.use(checkLoggedIn);

profileRouter.post("/create-profile", async (req, res) => {
  const profile = await createProfile(req.body);
  res.json(profile);
});

profileRouter.put("/update-profile/:id", async (req, res) => {
  const profile = await updateProfile(req.params, req.body);
  res.json(profile);
});

//api xoa profile
profileRouter.delete("/delete-profile/:id", async (req, res) => {
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

// sua xoa ho so ca nhan theo token
profileRouter.put("/update-profile", async (req, res) => {
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

export default profileRouter;
