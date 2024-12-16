import dotenv from "dotenv";
dotenv.config();

const config = {
	PORT: process.env.PORT || 3000,
	MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI,
	JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
