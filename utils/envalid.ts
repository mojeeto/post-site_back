import { cleanEnv, str } from "envalid";
import dotenv from "dotenv";
dotenv.config();

const env = cleanEnv(process.env, {
  MONGO_DB_URL: str(),
  MONGO_DB_COLLECTION: str(),
});

export default env;
