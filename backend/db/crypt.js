import { hash, compare } from "bcrypt";

const saltRounds = 10;

const hashItem = async (item) => {
	try {
		return await hash(item, saltRounds);
	} catch (err) {
		console.error("Hashing error:", err);
		throw new Error("Hashing failed. Please try again later.");
	}
};

const compareItem = async (item, hash) => {
	try {
		return await compare(item, hash);
	} catch (err) {
		console.error("Comparison error:", err);
		throw new Error("Comparison failed. Please try again later.");
	}
};

export { hashItem, compareItem };
