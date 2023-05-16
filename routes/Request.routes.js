import RequestModel from "../db/models/Request.model.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

export const createRequest = async (hostname, ip, mac, openPorts, osNmap) => {
  const newRequest = new RequestModel({
    hostname,
    ip,
    mac: mac ? mac : undefined,
    openPorts,
    osNmap: osNmap ? osNmap : undefined,
  });

  await newRequest.save();
};

export const MakeRequests = async (app) => {
  // GET ALL REQUEST
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
