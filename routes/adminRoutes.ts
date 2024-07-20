import { Router } from "express";

const router=Router()
router.use(() => {});
router.get("/stats", () => {});
router.get("/requestsStats", () => {});

export default router