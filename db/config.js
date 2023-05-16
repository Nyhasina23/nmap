import mongoose from "mongoose";

export const MongooseConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/nmap")
    .then(() => console.log("Nmap Database connection established"))
    .catch(() => console.log("Database connection failed"));
};
