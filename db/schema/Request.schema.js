import mongoose from "mongoose";

const RequestSchema = mongoose.Schema({
  hostname: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  mac: {
    type: String,
    required: false,
    default: null,
  },
  openPorts: [
    {
      port: {
        type: Number,
      },
      protocol: {
        type: String,
      },
      service: {
        type: String,
      },
      method: {
        type: String,
      },
    },
  ],
  osNmap: {
    type: String,
    required: false,
    default: null,
  },
});

export default RequestSchema;
