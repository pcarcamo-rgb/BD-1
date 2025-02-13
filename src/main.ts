import express from "express";
import dotenv from "dotenv";
import http from "http";
import productRouter from "./products/routes/product.routes";
import cartRouter from "./cart/routes/cart.routes";
import { Server } from "socket.io";
import path from "path";
import viewRouter from "./views/router/view.routes";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use("/", viewRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);

const server = http.createServer(app);

export const io = new Server(server);

server.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
