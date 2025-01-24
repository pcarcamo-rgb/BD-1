import express from "express";
import dotenv from "dotenv";
import productRouter from "./products/routes/product.routes";

const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use("/api", productRouter);

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
