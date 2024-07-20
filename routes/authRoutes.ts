import { Router } from "express";
import {signup} from './../controllers/authController'
const router=Router()

router.post("/signup",signup);
router.post("/login", () => {});
router.post("/forgotPassword", () => {});
router.post("/verifyaccount/:verificationcode", () => {});
router.patch("/resetPassword/:code", () => {});

export default router 