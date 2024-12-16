import config from "./constants.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer "))
		return res.status(403).json({ msg: "Token Missing" });

	const token = authHeader.split(" ")[1];
	try {
		const decodedToken = jwt.verify(token, config.JWT_SECRET);
		if (!decodedToken) return res.status(403).json({ msg: "Invalid Token" });
		req.userId = decodedToken.userId;
		next();
	} catch (err) {
		return res.status(403).json({ msg: "Authorization Error" });
	}
};

export default authMiddleware;
