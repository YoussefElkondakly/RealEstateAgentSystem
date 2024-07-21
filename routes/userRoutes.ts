import { protect,logout } from "../controllers/authController";
import {getMyProfile,updateProfile,updatePassword,deleteProfile} from './../controllers/profileController'
import { Router } from "express";
const router = Router()
router.use(protect);
router.get("/logout",logout);
router.get('/myprofile',getMyProfile)
router.patch('/updateProfile',updateProfile)
router.patch('/updatePassword',updatePassword)
router.delete("/deleteProfile", deleteProfile);
export default router

/**
 * router.use(authController.protect)
router.get("/logout", authController.logout);
//managing all the auth routes 
router.get('/myprofile',profileController.getMyProfile)
router.patch('/updateProfile',profileController.updateProfile)
router.patch('/updatePassword',profileController.updatePassword)
router.delete("/deleteProfile", profileController.deleteProfile);
 */