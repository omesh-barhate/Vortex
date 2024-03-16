import jsonwebtoken from "jsonwebtoken";
const token = (userIdentity, response) => {
	const token = jsonwebtoken.sign({ userId: userIdentity }, process.env.JWT_SECRET_KEY, {
		expiresIn: "15d",
	});
	response.cookie("user_token", token, {
		httpOnly: true, 
		maxAge: 15 * 24 * 60 * 60 * 1000,
		sameSite: "strict", 
	});
	return token;
};

export default token;
