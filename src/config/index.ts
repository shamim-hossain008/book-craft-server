import dotenv from "dotenv";

dotenv.config();

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
};
