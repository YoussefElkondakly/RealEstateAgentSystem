// const imageUpload = require("./../utils/imageUpload");
import {catchAsync} from"./../utils/catchAsync";
import {AppError} from"../utils/appError";
import {Ads} from"./../model/adsmodel";
import {RequestAd} from"./../model/requestModel";
import { Op } from "sequelize";
import { User } from "../model/usermodel";

export const getAds = catchAsync(async (req, res, next) => {
  const ads = await Ads.findAll();
  if (ads.length === 0) return next(new AppError("No Ads Right Now", 404));

  res.status(200).json({
    status: "success",
    data: ads,
  });
});

export const getAd = catchAsync(async (req, res, next) => {
  const ad = await Ads.findOne({ where:{id:req.params.adId} }) ;
  if (!ad) return next(new AppError("No Ads Right Now", 404));

  res.status(200).json({
    status: "success",
    data: ad,
  });
});
//POST REQUEST
export const postApropertyRequest = catchAsync(async (req, res, next) => {
  const makeRequest = await req.user.createRequestAd(req.body);
  if (!makeRequest)
    return next(new AppError("There is A problem Sending The Ad", 401));

  res.status(200).json({
    status: "success",
    data: makeRequest,
  });
  // res.end()
});

export const viewMatchAds = catchAsync(async (req, res, next) => {
const page = parseInt(req.query.page+'' )|| 1;
    const limit = parseInt(req.query.limit+'') || 10;
    const offset = (page - 1) * limit;
  const request = await req.user.getRequestAd({
    where: { id: req.params.requestId },
  });
  if (!request) return next(new AppError("No Request Found", 404));
  // console.log(request);
  const budget = request.price;
  //$or: [ { score: { $gt: 70, $lt: 90 } }
  //district, price, and area
  // console.log(budget + budget * 0.1, budget - budget * 0.1);
  const ads = await Ads.findAll({
    where:{
     [Op.and]: [
       { [Op.or]: [
      {
              price: {
                [Op.gte]: budget - budget * 0.1,
              },
            },
            {
              price: {
                [Op.lte]: budget + budget * 0.1,
              },
            },
          ],},
    
          { area: { [Op.iLike]: request[0].area } },
        { district: { [Op.iLike]: request[0].district } },
    ],},    
  include: [
      {
        model: User,
        attributes: ["name", "phone"],
      },
    ],
  offset: offset,
    limit: limit, });
  // await Ads.populate(ads, { path: "agent", select: "name phone -_id" });
  if (ads.length === 0)
    return next(new AppError("No Ads Found at this moment", 404));
  res.status(200).json({
    status: "success",
    data: ads,
  });
});
export const getAllRequests = catchAsync(async (req, res, next) => {
  const requests = await req.user.getRequestAd();
  if (requests.length === 0) return next(new AppError("No Ads Right Now", 404));
  res.status(200).json({
    status: "success",
    data: requests,
  });
});

export const getRequest = catchAsync(async (req, res, next) => {
  const request = await req.user.getRequestAd({where:{ id: req.params.requestId }});
  // if (request.length === 0) return next(new AppError("No Ads Right Now", 404));

  // request.refreshedAt = Date.now();
  // await request.save();
  res.status(200).json({
    status: "success",
    data: request,
  });
});

export const updateRequest = catchAsync(async (req, res, next) => {
  /**
   * const updatedAd = await Ads.update(req.body, {
      where: {
        id: ad[0].id,
      },
      returning: true,
    });
     const ad = await req.user.getAds({ where: { id: req.params.adId } });
   */
  const request = await req.user.getRequestAd({
    where: { id: req.params.requestId },
  });

  const updatedRequest = await RequestAd.update(req.body,{where:{id: request[0].id,},
  
    returning: true,
  }
  );

  res.status(200).json({
    status: "success",
    data: updatedRequest,
  });
});

export const deleteRequest = catchAsync(async (req, res, next) => {
  // if (request.length === 0||!(''+request.client===req.user.id)) return next(new AppError("No Ads Right Now", 404));
  const request = await req.user.getRequestAd({
    where: { id: req.params.requestId },
  });

  const deleteRequest = await RequestAd.destroy( {
    where: { id: request[0].id },
  });
  // const request = await RequestAd.findByIdAndDelete(req.params.requestId);
  res.status(204).json({
    status: "success",
    data: request,
  });
});

// const {client} = await RequestAd.findOne({ _id: req.params.requestId }).select("client -_id");
// console.log(client)
//   if (request.length === 0 || !("" + request.client === req.user.id))
//     return next(new AppError("No Ads Right Now", 404));

// const request = await RequestAd.findOne({ _id: req.params.requestId });
// console.log(request)
// if (!request||!(''+request.client===req.user.id)) return next(new AppError("No Ads Right Now", 404));

//in this controller you are an official verified client
//you have in the request the params of the requested property's Id and your user Id that will be linked
//to the ad
//you have in the request body that have a message to the agent

// const getAll=function(Model){
//   return catchAsync(async (req, res, next) => {
//   const all = await Model.find({client:user.id});
//   if (all.length === 0) return next(new AppError("No Ads Right Now", 404));

//   res.status(200).json({
//     status: "success",
//     data: all,
//   });
// });
// }
