import { Router } from "express";
import { userRouter } from "./user.js";
import { accountRouter } from "./account.js";
  
export const router = Router() 

router.use("/user",userRouter)
router.use("/account",accountRouter)