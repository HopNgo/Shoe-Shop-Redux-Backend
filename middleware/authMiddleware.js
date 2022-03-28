import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(400).json("Access token not found");
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    req.userId = decoded.userId;
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json("Invalid token");
  }
};
