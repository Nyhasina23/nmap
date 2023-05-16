import { createRequest } from "./Request.routes.js";
import nmap from "node-nmap";
import UserModelRequest from "../db/models/UserRequest.model.js";
import { ObjectId } from "mongodb";
import { authenticateToken } from "../middlewares/authenticateToken.js";

export const MakeUserRequest = (app) => {
  // GET USER OWNER REQUEST
  app.get("/request/user", authenticateToken, async (req, res) => {
    try {
      const userRequest = await UserModelRequest.aggregate([
        {
          $match: { owner: new ObjectId(req.query.owner_id) },
        },
      ]);
      userRequest
        ? res.status(200).send(userRequest)
        : res.status(404).send({ message: "User Request not found" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error when getting user request" });
    }
  });

  // SCAN REQUEST
  app.post("/request/scan", authenticateToken, (req, res) => {
    try {
      const { host, scanType, maxRetries, hostTimeout, owner } = req.body;

      const options = {
        flags: [
          scanType,
          "--max-retries",
          maxRetries.toString(),
          "--host-timeout",
          hostTimeout.toString(),
        ],
      };

      const nmapScan = new nmap.NmapScan(host, options.flags);

      nmapScan.on("complete", async (data) => {
        // SAVE USER REQUEST
        const NewUserModelRequest = new UserModelRequest({
          host,
          scanType,
          maxRetries,
          hostTimeout,
          owner,
        });

        await NewUserModelRequest.save();

        // SAVE REQUEST IN DATABASE
        await createRequest(
          data[0].hostname,
          data[0].ip,
          data[0]?.mac,
          data[0].openPorts,
          data[0]?.osNmap
        );

        res.status(200).send({ message: "Data request saved successfully" });
      });

      nmapScan.on("error", () => {
        res.status(500).send({ message: `Error when scanning ${host}` });
      });

      nmapScan.startScan();
    } catch (error) {
      console.log("error ", error);
      res.status(500).send({ message: "Error when making scan request" });
    }
  });
};
