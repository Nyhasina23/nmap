import express from "express";
import morgan from "morgan";
import { MongooseConnection } from "./db/config.js";
import bodyParser from "body-parser";
import { MakeRequests } from "./routes/Request.routes.js";
import { MakeUserRequest } from "./routes/UserRequest.routes.js";
import { UserAuthentication } from "./routes/User.routes.js";
import dotenv from "dotenv";

dotenv.config();
MongooseConnection();
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MakeRequests(app);
MakeUserRequest(app);
UserAuthentication(app);

const PORT = 3000;

app.listen(PORT, () => console.log(`Nmap server listening on port ${PORT}`));
