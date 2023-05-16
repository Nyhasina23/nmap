import Jwt from "jsonwebtoken";
//Middleware
export async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    let token;
    if (authHeader.includes("Bearer")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader;
    }
    try {
      const payload = Jwt.verify(token, process.env.SECRET);
      res.locals.jwtPayload = payload;
    } catch (error) {
      res.status(403).send({ message: "The token you sent is not valid" });
      return;
    }
  } else {
    res.status(403).send({ message: "Please login" });
    return;
  }
  next();
}
