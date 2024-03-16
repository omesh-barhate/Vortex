import express from "express";
import {
	followUnFollowUser,
	getUserProfile,
	loginUser,
	logoutUser,
	signupUser,
	updateUser,
	getSuggestedUsers,
	freezeAccount,
} from "../controllers/usercontroller.js";
import authroute from "../middlewares/authroute.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.get("/suggested", authroute, getSuggestedUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", authroute, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", authroute, updateUser);
router.put("/freeze", authroute, freezeAccount);

export default router;