import express from "express";
import { deleteuser, getallusers, updateuser } from "../controllers/user.js";
import { loginUser } from "../middlewares/login.js";
import { RegisterUser } from "../middlewares/register.js";
export const router = express.Router();
router.get("/", getallusers), //testé
  router.post("/login", loginUser, (req, res) => {
    res.status(200).json({
      message: "Login successful",
      user: req.user,
    });
  }); //testé
router.post("/signup", RegisterUser, (req, res) => {
  res.status(201).json({
    message: "User registered successfully",
    user: req.user,
  });
}); //testé
router.put("/:id", updateuser); //TESTé
router.delete("/:id", deleteuser); //testé
export default router;
