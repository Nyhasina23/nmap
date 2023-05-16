import mongoose from "mongoose";

const UserRequestSchema = mongoose.Schema({
  host: {
    type: String,
    required: true,
  },
  scanType: {
    type: String,
    required: true,
  },
  maxRetries: {
    type: String,
    required: false,
  },
  hostTimeout: {
    type: String,
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }
});

export default UserRequestSchema;
