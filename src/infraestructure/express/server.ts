import dotenv from "dotenv";
import app from "../../app";
import productRouter from "../routes/product.routes";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use("/api", productRouter);

// Arrancar el servidor
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
