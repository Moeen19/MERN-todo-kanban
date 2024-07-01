import jwt from "jsonwebtoken";
import User from "../db/models/userSchema.js";

const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  // console.log(req, '-------------------------')

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401).json({msg: `Not authorized, invalid token, ${error}`})
    }
  } else {
    const error =  new Error("Not authorized, no token");
    error.status = 401;
    next(error)
  }
};

export { protect }
