import express from "express";
import {
	createPost,
	deletePost,
	getPost,
	likeUnlikePost,
	replyToPost,
	getFeedPosts,
	getUserPosts,
} from "../controllers/postcontroller.js";
import authroute from "../middlewares/authroute.js";

const router = express.Router();

router.get("/feed", authroute, getFeedPosts);
router.get("/:id", getPost);
router.get("/user/:username", getUserPosts);
router.post("/create", authroute, createPost);
router.delete("/:id", authroute, deletePost);
router.put("/like/:id", authroute, likeUnlikePost);
router.put("/reply/:id", authroute, replyToPost);

export default router;