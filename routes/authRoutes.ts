import { Router } from "express";
import {signup,login,forgotPassword,verifyAccount,resetPassword} from './../controllers/authController'
const router=Router()

router.post("/signup",signup);
router.post("/login",login );
router.post("/forgotPassword", forgotPassword);
router.post("/verifyaccount/:verificationcode",verifyAccount );
router.patch("/resetPassword/:code", resetPassword);

export default router 

/**
 * router.post('/signup',authController.signup)
router.post('/login',authController.login)
router.post("/forgotPassword", authController.forgotPassword);
router.post("/verifyaccount/:verificationcode", authController.verifyAccount);
router.patch('/resetPassword/:code',authController.resetPassword)
 */