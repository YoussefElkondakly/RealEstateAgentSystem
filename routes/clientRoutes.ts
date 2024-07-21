import { Router } from "express";
import { protect,accessManager,isVerified } from "../controllers/authController";
import {getAds,getAd,getAllRequests,postApropertyRequest,viewMatchAds,getRequest,updateRequest,deleteRequest} from './../controllers/clientController'
const router = Router();
router.use(protect, accessManager("client"));
router.get("/getAds", getAds);
router.get("/getAds/:adId", getAd);
router.use(isVerified);
router.get("/requests", getAllRequests);
router.post("/requests", postApropertyRequest);

router.get(
  "/requests/viewMatchAd/:requestId",
 
  viewMatchAds
);
router.get(
  "/requests/:requestId",
 
  getRequest
);
router.patch(
  "/requests/:requestId",
 
  updateRequest
);
router.delete(
  "/requests/:requestId",
 
  deleteRequest
);

//Will Make The one User Only Make one Request

export default router;
