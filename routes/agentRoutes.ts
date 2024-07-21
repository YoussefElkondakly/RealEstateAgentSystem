import { Router } from "express";
import { protect,accessManager ,isVerified} from "../controllers/authController";
import {
  getAllRequests,
  uploadImage,
  makeAd,
  getMyAds,
  getRequest,
  matchRequest,
  getAd,
  checkBody,
  deleteAd,
} from "../controllers/agentController";
const router = Router();
router.use(protect, accessManager("agent"));
//The first route is like a home of all requests in the agent routes
router.get("/requests", getAllRequests);
router.post(
  "/makeAd",isVerified,
 uploadImage, makeAd
);
router.get("/getMyAds", getMyAds);

router.use(isVerified);
router.get("/getRequest/:requestId",getRequest);
router.get(
  "/getAd/:adId/matchRequest",
  //agentController.checkOwnerShip,
  matchRequest
);
router
  .route("/getAd/:adId")
  .get(
    //agentController.checkOwnerShip,

    getAd
  )
  .patch(
    //agentController.checkOwnerShip,
   uploadImage ,checkBody
  )
  .delete(
    //agentController.checkOwnerShip,
  deleteAd
  );
export default router;

/**
//The first route is like a home of all requests in the agent routes

router.use(authController.isVerified);
router.get("/getRequest/:requestId", agentController.getRequest);
router.get(
  "/getAd/:adId/matchRequest",
  //agentController.checkOwnerShip,
  agentController.matchRequest
);
router
  .route("/getAd/:adId")
  .get(
    //agentController.checkOwnerShip,

    agentController.getAd
  )
  .patch(
    //agentController.checkOwnerShip,
    agentController.uploadImage,
agentController.checkBody
  )
  .delete(
    //agentController.checkOwnerShip, 
    agentController.deleteAd);
 */