import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import authRoute from "./routes/auth.route";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("Missing MONGODB_URI");
}

connectDB(mongoUri).catch((err) => {
  console.error("Mongo connection error:", err);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
