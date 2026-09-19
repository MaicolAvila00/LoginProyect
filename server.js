import express from "express";
import cors from "cors";
import authRoutes from "./authRoutes.js";
import path from "path";

console.log("Ruta actual:", path.resolve());

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
