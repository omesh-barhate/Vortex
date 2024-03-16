import path from "path";
import express from "express";
import dotenv from "dotenv";
import connection from "./db/connection.js";
import cookieParser from "cookie-parser";
import userroute from "./routes/userroute.js";
import postroute from "./routes/postroute.js";
import messageroute from "./routes/messageroute.js";
import { v2 as cloudinary } from "cloudinary";
import { app, server } from "./socket/socket.js";
import job from "./cron/cron.js";

dotenv.config();

connection();
job.start();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use("/api/users", userroute);
app.use("/api/posts", postroute);
app.use("/api/messages", messageroute);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));