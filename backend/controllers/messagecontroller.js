import Conversation from "../models/conversationmodel.js";
import Message from "../models/messagemodel.js";
import { getRecipientSocketId, io } from "../socket/socket.js";
import { v2 as cloudinary } from "cloudinary";

async function dispatchMessage(req, res) {
	try {
		const { recipientId, message } = req.body;
		let { image } = req.body;
		const senderId = req.user._id;

		let convo = await Conversation.findOne({
			participants: { $all: [senderId, recipientId] },
		});

		if (!convo) {
			convo = new Conversation({
				participants: [senderId, recipientId],
				lastMessage: {
					text: message,
					sender: senderId,
				},
			});
			await convo.save();
		}

		if (image) {
			const uploadedResponse = await cloudinary.uploader.upload(image);
			image = uploadedResponse.secure_url;
		}

		const freshMessage = new Message({
			conversationId: convo._id,
			sender: senderId,
			text: message,
			image: image || "",
		});

		await Promise.all([
			freshMessage.save(),
			convo.updateOne({
				lastMessage: {
					text: message,
					sender: senderId,
				},
			}),
		]);

		const recipientSocketId = findRecipientSocketId(recipientId);
		if (recipientSocketId) {
			io.to(recipientSocketId).emit("newMessage", freshMessage);
		}

		res.status(201).json(freshMessage);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

async function retrieveMessages(req, res) {
	const { targetUserId } = req.params;
	const userId = req.user._id;
	try {
		const convo = await Conversation.findOne({
			participants: { $all: [userId, targetUserId] },
		});

		if (!convo) {
			return res.status(404).json({ error: "No Conversation Found" });
		}

		const messages = await Message.find({
			conversationId: convo._id,
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

async function retrieveConversations(req, res) {
	const userId = req.user._id;
	try {
		const conversations = await Conversation.find({ participants: userId }).populate({
			path: "participants",
			select: "username profilePic",
		});

		conversations.forEach((convo) => {
			convo.participants = convo.participants.filter(
				(participant) => participant._id.toString() !== userId.toString()
			);
		});
		res.status(200).json(conversations);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export { dispatchMessage as sendMessage, retrieveMessages as getMessages, retrieveConversations as getConversations };
