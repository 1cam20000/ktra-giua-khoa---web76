import express from "express";
import {
  allUsers,
  createUser,
  deleteUser,
  findOneUser,
  updateUser,
} from "../services/user.service.js";
import { checkLoggedIn } from "../services/middleware.js";
import jwt from "jsonwebtoken";

const userRouter = express.Router();
userRouter.use(checkLoggedIn);

userRouter.get("/users", async (req, res) => {
  const users = await allUsers();
  console.log("🚀 ~ userRouter.get ~ users:", users);

  res.json(users);
});

userRouter.post("/create-user", async (req, res) => {
  const user = await createUser(req.body);
  console.log("🚀 ~ userRouter.post ~ user:", user);
  res.json({ user });
});

userRouter.put("/update-user/:id", async (req, res) => {
  const user = await updateUser(req.params, req.body);
  res.json(user);
});

userRouter.delete("/delete-user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await deleteUser(userId, () => {
    if (err) {
      res.json("err: ", err);
    } else {
      res.json("user delete successfully");
    }
  });
});

//api user login
userRouter.post("/login", () => {
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

export default userRouter;
