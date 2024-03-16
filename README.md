# Vortex: Realtime Chat App

Welcome to Vortex, our Realtime Chat App! This application enables users to engage in real-time conversations with each other, accompanied by a variety of additional features aimed at enriching the chatting experience.

## Features

- **Tech stack**: MERN (MongoDB, Express.js, React.js, Node.js) + Socket.io + Chakra UI
- **Authentication & Authorization**: Implements JWT for secure authentication and authorization.
- **Create Post**: Users can create new posts.
- **Delete Post**: Users can delete their own posts.
- **Like/Unlike Post**: Users can like/unlike posts.
- **Comment to a Post**: Users can comment on posts.
- **Follow/Unfollow Users**: Users can follow/unfollow other users.
- **Freeze Your Account**: Provides the option to temporarily freeze user accounts.
- **Dark/Light Mode**: Supports both dark and light mode for user preference.
- **Completely Responsive**: Ensures seamless user experience across all devices.
- **Chat App With Image Support**: Users can send images in chat messages.
- **Seen/Unseen Status for Messages**: Indicates whether messages have been seen or not.
- **Notification Sounds**: Offers notification sounds for new messages.

## Tech Stack

- MongoDB: Database to store user data, posts, and messages.
- Express.js: Backend framework for handling HTTP requests and routes.
- React.js: Frontend library for building user interfaces.
- Node.js: JavaScript runtime environment for running server-side code.
- Socket.io: Library for enabling real-time, bidirectional communication between clients and server.
- Chakra UI: Component library for building accessible and customizable UI components.

## Setup

1. Clone the repository.
2. Navigate to the project directory.
3. Create a `.env` file in the root directory and add the following environment variables:
- PORT=... (Port number for running the server)
- MONGO_URI=... (MongoDB connection URI)
- JWT_SECRET=... (Secret key for JWT token)
- CLOUDINARY_CLOUD_NAME=... (Cloudinary cloud name for image upload)
- CLOUDINARY_API_KEY=... (Cloudinary API key)
- CLOUDINARY_API_SECRET=... (Cloudinary API secret)
4. Install dependencies by running `npm install`.
5. Build the app using `npm run build`.
6. Start the app with `npm start`.

Feel free to contribute to this project by forking and submitting pull requests. If you encounter any issues or have suggestions for improvement, please create an issue in the repository.

Happy Chatting with Vortex! 🌀
