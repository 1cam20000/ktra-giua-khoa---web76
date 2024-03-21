import express from "express";
import { checkLoggedIn } from "../services/middleware.js";
import { createProfile, updateProfile } from "../services/profile.service.js    ";

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

export default profileRouter;
