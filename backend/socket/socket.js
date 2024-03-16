import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

const appInstance = express();
const serverInstance = http.createServer(appInstance);
const socketIOInstance = new Server(serverInstance, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

export const findRecipientSocketId = (recipientId) => {
	return userSocketDatabase[recipientId];
};

const userSocketDatabase = {}; 

socketIOInstance.on("connection", (socket) => {
	console.log("A user has connected with ID:", socket.id);
	const userIdentity = socket.handshake.query.userId;

	if (userIdentity !== "undefined") userSocketDatabase[userIdentity] = socket.id;
	socketIOInstance.emit("fetchOnlineUsers", Object.keys(userSocketDatabase));

	socket.on("markMessagesRead", async ({ conversationId, userIdentity }) => {
		try {
			await Message.updateMany({ conversationId: conversationId, read: false }, { $set: { read: true } });
			await Conversation.updateOne({ _id: conversationId }, { $set: { "latestMessage.read": true } });
			socket.to(userSocketDatabase[userIdentity]).emit("messagesAcknowledged", { conversationId });
		} catch (error) {
			console.error("Error while marking messages as read:", error);
		}
	});

	socket.on("disconnect", () => {
		console.log("A user has disconnected");
		delete userSocketDatabase[userIdentity];
		socketIOInstance.emit("fetchOnlineUsers", Object.keys(userSocketDatabase));
	});
});

export { socketIOInstance as socketIO, serverInstance as server, appInstance as app };
