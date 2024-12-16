import { Schema, model, connect } from "mongoose";
import config from "../constants.js";

const main = async () => {
	const connected = await connect(config.MONGO_CONNECTION_URI);
	if (!connected) throw new Error("There's some error connecting to DB");
};

main().catch((err) => console.log(err));

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		minLength: 3,
		maxLength: 30,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
});

const acountSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	balance: {
		type: Number,
		required: true,
		default: 0,
	},
});

export const User = model("User", userSchema);
export const Account = model("Account", acountSchema);
