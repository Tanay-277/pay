import { Router } from "express";
import { Account } from "../db/db.js";
import authMiddleware from "../middleware.js";
import { startSession } from "mongoose";
import { handleValidation } from "./user.js";
import { z } from "zod";

export const accountRouter = Router();

const transferValidation = z.object({
	to: z.string(),
	amount: z.coerce.string(),
});

accountRouter.use(authMiddleware);

accountRouter.get("/balance", async (req, res) => {
	try {
		const account = await Account.findOne({ userId: req.userId });
		if (!account)
			return res.status(404).json({ msg: "Account does not exist" });

		res
			.status(200)
			.json({ msg: "Balance Fetched Successfully", balance: account.balance });
	} catch (error) {
		res.status(500).json({ msg: "Internal Server Error" });
	}
});

accountRouter.post("/transfer", async (req, res) => {
	const session = await startSession();
	session.startTransaction();
	try {
		const { amount, to } = handleValidation(transferValidation, req.body);

		const account = await Account.findOne({ userId: req.userId }).session(
			session
		);
		if (!account || account.balance < amount)
			throw new Error("Insufficient Balance");

		const toAccount = await Account.findOne({ userId: to }).session(session);
		if (!toAccount) throw new Error("Invalid recipient");

		await Account.updateOne(
			{ userId: req.userId },
			{ $inc: { balance: -amount } }
		).session(session);
		await Account.updateOne(
			{ userId: to },
			{ $inc: { balance: amount } }
		).session(session);

		await session.commitTransaction();
		res.status(200).json({ msg: "Transfer Successful!" });
	} catch (error) {
		await session.abortTransaction();
		res.status(400).json({ msg: error.message });
	} finally {
		session.endSession();
	}
});

export default accountRouter;
