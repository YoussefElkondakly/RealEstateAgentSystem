import { Router } from "express";
const router = Router()
router.use(() => {});
router.get("/logout", () => {});
router.get('/myprofile',()=>{})
router.patch('/updateProfile',()=>{})
router.patch('/updatePassword',()=>{})
router.delete("/deleteProfile", ()=>{});
export default router