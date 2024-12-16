import express from "express";
import jwt from "jsonwebtoken";
import { User, Account } from "../db/db.js";
import config from "../constants.js";
import { z } from "zod";
import authMiddleware from "../middleware.js";
import { hashItem, compareItem } from "../db/crypt.js";

const { JWT_SECRET } = config;

const signUpValidation = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
});

const signInValidation = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

const updateValidation = z.object({
	name: z.string().optional(),
	password: z.string().optional(),
});

export const userRouter = express.Router();

const generateToken = (userId) => jwt.sign({ userId }, JWT_SECRET);

export const handleValidation = (schema, payload) => {
	const validation = schema.safeParse(payload);
	if (!validation.success) {
		throw new Error("Validation Error");
	}
	return validation.data;
};

userRouter.post("/sign-up", async (req, res) => {
	try {
		const payload = handleValidation(signUpValidation, req.body);
		const existingUser = await User.findOne({ email: payload.email });
		if (existingUser)
			return res.status(409).json({ msg: "Email already exists!" });

		const savedUser = await User.create({
			...payload,
			password: await hashItem(payload.password),
		});
		const token = generateToken(savedUser._id);

		await Account.create({
			userId: savedUser._id,
			balance: 1 + Math.random() * 1000,
		});

		res
			.status(200)
			.json({ message: "User created successfully", user: savedUser, token });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

userRouter.post("/sign-in", async (req, res) => {
	try {
		const payload = handleValidation(signInValidation, req.body);
		const user = await User.findOne({ email: payload.email });
		if (!user) return res.status(404).json({ msg: "User does not exist!" });

		const correctPassword = await compareItem(payload.password, user.password);
		if (!correctPassword)
			return res.status(401).json({ msg: "Incorrect Password" });

		const token = generateToken(user._id);
		res.json({ message: `${user.name} logged in successfully`, token });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

userRouter.patch("/update", authMiddleware, async (req, res) => {
	try {
		const payload = handleValidation(updateValidation, req.body);
		if (payload.password) {
			payload.password = await hashItem(payload.password);
		}
		const updatedUser = await User.findByIdAndUpdate(req.userId, payload, {
			new: true,
		});
		if (!updatedUser) return res.status(411).json({ msg: "Error updating!" });

		res
			.status(200)
			.json({ msg: "User Updated Successfully", user: updatedUser });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
	try {
		const filter = req.query.filter || "";
		const users = await User.find({
			_id: { $ne: req.userId },
			name: {
				$regex: filter,
				$options: "i",
			},
		});
		if (!users) return res.status(411).json({ msg: "Error finding users" });

		const friends = users.map((user) => ({
			_id: user._id,
			email: user.email,
			name: user.name,
		}));

		return res.status(200).json({
			msg: "Users found",
			friends,
		});
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

userRouter.get("/validate-token", authMiddleware, async (req, res) => {
	try {
		const userId = req.userId;
		if (!userId) return res.status(411).json({ msg: "User id missing" });

		const user = await User.findById(userId);
		if (!user) return res.status(411).json({ msg: "User not found" });

		res.status(200).json({
			msg: "User found!",
			user: {
				id:user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});
