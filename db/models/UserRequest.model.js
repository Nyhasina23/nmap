import mongoose from "mongoose";

import UserSchemaRequest from "../schema/UserSchemaRequest.schema.js";

const UserModelRequest = mongoose.model("userRequests", UserSchemaRequest);
export default UserModelRequest;