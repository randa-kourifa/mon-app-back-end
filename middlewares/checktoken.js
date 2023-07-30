import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schemas/user.js";
const JWT_SECRET =
  "randaquiessayedereparersontokenpourlapremierfois123456789try2";

export const checkuser = async (req, res) => {
  const { email } = req.body;
  try {
    const finduser = await User.findOne({ email });
    if (!finduser) return res.status(400).json({ message: "user not found" });
    console.log("user", finduser);
    const ismatch = await bcrypt.compare(req.body.password, finduser.password);
    if (!ismatch) return res.status(400).json({ message: "invalid password" });
    const { password, ...rest } = finduser;
    jwt.sign(
      { id: finduser._id },
      JWT_SECRET,
      { expiresIn: "14 days" },
      (err, token) => {
        if (err) return res.status(500).json({ message: "error in token" });
        res.status(200).json({ token, finduser: rest });
      }
    );

    //res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({
      location: "error in checkuser",
      message: error.message,
    });
  }
};
