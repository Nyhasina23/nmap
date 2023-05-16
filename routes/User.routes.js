import UserModel from "../db/models/User.model.js";
import { generateToken } from "../utils/generateJWTToken.js";

export const UserAuthentication = (app) => {
  app.post("/signup", async (req, res) => {
    try {
      const { username, password } = req.body;
      const newUser = new UserModel({
        username,
        password,
      });
      await newUser.save();
      const token = generateToken(newUser._id, username);
      res
        .status(200)
        .send({ message: "User created successfully", username, token });
    } catch (error) {
      console.log(error)
      res.status(200).send({ message: "Error when creating user" });
    }
  });

  app.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({
      username,
      password,
    });
    if (user) {
      const token = generateToken(user._id, username);
      res
        .status(200)
        .send({ message: "User Connected successfully", username, token });
    } else {
      res.status(200).send({ message: "Username or password incorrect!" });
    }
  });
};
