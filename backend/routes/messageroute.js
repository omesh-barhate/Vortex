import express from "express";
import authroute from "../middlewares/authroute.js";
import { getMessages, sendMessage, getConversations } from "../controllers/messagecontroller.js";

const router = express.Router();

router.get("/conversations", authroute, getConversations);
router.get("/:otherUserId", authroute, getMessages);
router.post("/", authroute, sendMessage);

export default router;