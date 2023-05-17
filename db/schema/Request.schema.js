import mongoose from "mongoose";

const RequestSchema = mongoose.Schema({
  scanResult: {
    type: String,
    required: true,
  },
});

export default RequestSchema;
