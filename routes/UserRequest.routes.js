import { createRequest } from "./Request.routes.js";
import { spawn } from "child_process";
import nmap from "node-nmap";
import UserModelRequest from "../db/models/UserRequest.model.js";
import { ObjectId } from "mongodb";
import { authenticateToken } from "../middlewares/authenticateToken.js";

export const MakeUserRequest = (app) => {
  // GET USER OWNER REQUEST - HISTORY OF USER REQUEST
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

  // SCAN REQUEST WITH NMAP
  app.post("/request/scan", authenticateToken, (req, res) => {
    try {
      const { host, scanType, maxRetries, hostTimeout, owner } = req.body;

      const options = [
        scanType,
        "--max-retries",
        maxRetries,
        "--host-timeout",
        hostTimeout,
      ];

      const nmapProcess = spawn("nmap", options.concat(host));

      let scanResult = "";

      nmapProcess.stdout.on("data", async (data) => {
        scanResult = data.toString();

        // SAVE USER REQUEST TO HISTORY
        const NewUserModelRequest = new UserModelRequest({
          host,
          scanType,
          maxRetries,
          hostTimeout,
          owner,
        });
        await NewUserModelRequest.save();

        // SAVE REQUEST IN DATABASE
        await createRequest(scanResult);
        res.status(200).send({ message: "Request saved successfully" });
      });

      nmapProcess.on("close", (code) => {
        if (code === 0) {
          console.log(scanResult);
          res.status(200).send(scanResult);
        } else {
          console.log("error");
        }
      });
    } catch (error) {
      console.log("error ", error);
      res.status(500).send({ message: "Error when making scan request" });
    }
  });
};
