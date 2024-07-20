import { Router } from "express";

const router = Router();
router.use(()=>{});
//The first route is like a home of all requests in the agent routes
router.get("/requests", ()=>{});
router.post(
  "/makeAd",
  ()=>{}
);
router.get("/getMyAds", ()=>{});

router.use(()=>{});
router.get("/getRequest/:requestId",()=>{});
router.get(
  "/getAd/:adId/matchRequest",
  //agentController.checkOwnerShip,
  ()=>{}
);
router
  .route("/getAd/:adId")
  .get(
    //agentController.checkOwnerShip,

    ()=>{}
  )
  .patch(
    //agentController.checkOwnerShip,
    ()=>{}
  )
  .delete(
    //agentController.checkOwnerShip, 
    ()=>{});
export default router;
