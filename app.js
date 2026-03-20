import express from "express";
import router from "./Router/routes.js";
import { mkdir } from "fs/promises";

const app = express();
const PORT = 3005;

// create data folder
// await mkdir("data", { recursive: true });

// middleware
app.use(express.urlencoded({ extended: true }));

app.set("view engine","ejs");
// app.set("views", "./views");   // OPTIONAL: Default is "./views"



// routes
app.use("/", router);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});