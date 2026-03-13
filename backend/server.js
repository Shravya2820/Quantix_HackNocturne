import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { registerUser } from "./auth/register.js";
import { loginUser } from "./auth/login.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", registerUser);
app.post("/login", loginUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});