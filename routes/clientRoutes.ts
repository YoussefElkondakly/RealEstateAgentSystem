import { Router } from "express";


const router = Router();
router.use(() => {});
router.get("/getAds", () => {});
router.get("/getAds/:adId", () => {});
router.use(() => {});
router.get("/requests", () => {});
router.post("/requests", () => {});

router.get("/requests/viewMatchAd/:requestId", () => {});
router.get("/requests/:requestId", () => {});
router.patch("/requests/:requestId", () => {});
router.delete("/requests/:requestId", () => {});

//Will Make The one User Only Make one Request

export default router;
