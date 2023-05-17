import RequestModel from "../db/models/Request.model.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

// CREATE REQUEST FUNCTION
export const createRequest = async (scanResult) => {
  const newRequest = new RequestModel({ scanResult });
  await newRequest.save();
}; 


export const MakeRequests = async (app) => {

  // GET ALL REQUEST PASSED
  app.get("/requests", authenticateToken, async (req, res) => {
    try {
      const requests = await RequestModel.find();
      requests
        ? res.status(200).send(requests)
        : res.status(404).send({ message: "Request not found" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
};
