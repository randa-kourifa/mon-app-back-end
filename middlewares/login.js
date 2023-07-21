import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schemas/user.js";

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({
      message: "All input is required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      await user.save();

      req.user = user;

      next();
    } else {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error logging in",
      error: err.message,
    });
  }
};
