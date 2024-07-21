import fs from 'fs'
import {uploadPhoto} from './../utils/imageUpload'
// const imageUpload = require("./../utils/imageUpload");
import { catchAsync } from './../utils/catchAsync';
// const catchAsync = require("./../utils/catchAsync");
// const paginate = require("./../utils/paginate");
import { AppError } from '../utils/appError';
// const AppError = require("..//utils/appError");
import {Ads} from "./../model/adsmodel";
import { RequestAd } from '../model/requestModel';
// const RequestAd = require("./../model/requestModel");
import {User} from"./../model/usermodel";
import { Op } from "sequelize";
import { RequestHandler } from 'express';

export const uploadImage = uploadPhoto("property",);
//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
export const makeAd:RequestHandler = async (req, res, next) => {
  try {
    // console.log("This", req.file);
    const base = req.originalUrl
      .split("/")
      .filter((el) => {
        if (el === "matchingSystem" || el === "propertyFinder") return el;
      })
      .join("/");
    // console.log(req.body.photo);
    if(!req.file)return next(new AppError("There is a Proplem Loading A File",401))
    req.body.photo = `${req.protocol}://${req.get("host")}/${base}/uploads/${
      req.category ? req.category + "/" : ""
    }${req.file.filename}`;
    req.body.agent = req.user.id;
    const ad = await req.user.createAd(req.body);

    if (!ad) next(new AppError("Somthing wrong", 403));

    res.status(201).json({
      status: "success",
      data: ad,
    });
  } catch (err) {
    //Require Testing
    // if (err!._message === "Ads validation failed") {
      fs.unlink(req.file!.path, (e) => console.log(e));
    // }
    next(err);
  }
};
//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
export const getMyAds = catchAsync(async (req, res, next) => {
//FIXME checker for the page is number not string
  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit+'')  || 10;
  const offset = (+page  - 1) * limit;
  const ads = await req.user.getAds({
    offset: offset,
    limit: limit,
  });
  // const ads = await paginate(req.query, query);
  // const adss=await pas
  // console.log(ads)
  if (ads.length === 0)
    return next(new AppError("You Didn't add any ads Yet", 404));
  res.status(200).json({
    status: "success",
    results: ads.length,
    data: ads,
  });
});
//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
export const getAllRequests = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit+'') || 10;
  const offset = (+page - 1) * +limit;

  const requests = await RequestAd.findAll({
    include: [
      {
        model: User,
        attributes: ["name", "phone"],
      },
    ],
    offset: offset,
    limit: limit,
  });
  // const requests = await paginate(req.query, query);
  if (requests.length === 0) return next(new AppError("No Ads Right Now", 404));
  res.status(200).json({
    status: "success",
    data: requests,
  });
});

// exports.checkOwnerShip = catchAsync(async (req, res, next) => {
//   // console.log(req.params)
//   const ad = await Ads.findOne({ _id: req.params.adId });
//   // console.log(ad)
//   if (!ad || !("" + ad.agent.id === req.user.id))
//     return next(new AppError("No Ads Right Now", 404));
//   next();
// });
//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
export const getAd = catchAsync(async (req, res, next) => {
  const ad = await req.user.getAds({
    where: {
      id: req.params.adId,
    },
  });
  if (!ad[0]) return next(new AppError("No Ads", 404));
  res.status(200).json({
    status: "success",
    data: ad,
  });
});
//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
export const checkBody :RequestHandler = (req, res, next) => {
  //check if req.file req.body
  if (req.file) {
    updateAd(req, res, next);
  } else {
    updateAdnophoto(req, res, next);
  }
};
//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
 const updateAd:RequestHandler = async (req, res, next) => {
  try {
    const base = req.originalUrl
      .split("/")
      .filter((el) => {
        if (el === "matchingSystem" || el === "propertyFinder") return el;
      })
      .join("/");

    req.body.photo = `${req.protocol}://${req.get("host")}/${base}/uploads/${
      req.category ? req.category + "/" : ""
    }${req.file!.filename}`;
    req.body.agent = req.user.id;
    
    // console.log(req.body.photo);
    const ad = await req.user.getAds({ where: { id: req.params.adId } });
    if (!ad) return next(new AppError("No Ads", 404));
    console.log(ad);

    const oldPicPath = ad[0].photo.split("/").splice(5, 7).join("/");
    fs.unlink(oldPicPath, (e) => console.log(e));

    //  / console.log(req.body);
    // await Ads.updateOne({ _id: req.params.adId }, req.body, {
    //   new: true,
    // });
     const updatedAd = await Ads.update(req.body, {
      where: {
        id: ad[0].id,
      },
      returning: true,
    });
    res.status(200).json({
      status: "success",
      data: updatedAd,
    });
  } catch (err) {
    if (req.file!.path !== undefined)
      fs.unlink(req.file!.path, (e) => console.log(e));
    next(err);
  }
};
//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
 const updateAdnophoto = catchAsync(async (req, res, next) => {
  // const ad = await Ads.findByIdAndUpdate({ _id: req.params.adId }, req.body, {
  //   new: true,
  //   runValidators: true,
  // });
  const ad = await Ads.update(req.body, {
    where: {
      id: req.params.adId,
      userId: req.user.id, // Ensure the ad belongs to the authenticated user
    },
    returning: true,
  });

  if (!ad) return next(new AppError("No Ads", 404));
  res.status(201).json({
    status: "success",
    data: ad[1],
  });
});
//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
export const deleteAd = catchAsync(async (req, res, next) => {
  const ad = await req.user.getAds({ where: { id: req.params.adId } });
  if (!ad[0]) return next(new AppError("No Ads", 404));
  const oldPicPath = ad[0].photo.split("/").splice(5, 7).join("/");
  // console.log(oldPicPath)
  fs.unlink(oldPicPath, (e) => console.log(e));
  const s = await Ads.destroy({ where: { id: ad[0].id } });

  res.status(204).json({
    status: "success",
    data: s,
  });
});
//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

export const matchRequest = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page+'' )|| 1;
    const limit = parseInt(req.query.limit+'') || 10;
    const offset = (page - 1) * limit;
  const ad = await req.user.getAds();
  if (!ad) return next(new AppError("No Ads", 404));
  const budget = ad[0].price;
  //125000
  //its a hard matching algorithm
  const requests = await RequestAd.findAll({
    where: {
      [Op.or]: [
        {
          [Op.and]: [
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
          ],
        },

        { area: { [Op.iLike]: ad[0].area } },
        { district: { [Op.iLike]: ad[0].district } },
      ],
    },
    include: [
      {
        model: User,
        attributes: ["name", "phone"],
      },
    ],
    offset: offset,
    limit: limit,
    // $match: {
    //   $or: [

    //         price: {
    //           $lte: budget + budget * 0.1,
    //           $gte: budget - budget * 0.1,
    //         },

    //       { area: { $regex: ad.area, $options: "i" } },
    //       { district: { $regex: ad.district, $options: "i" } },
    //     ],
    //   },
    // },
    // {
    //   $sort: { refreshedAt: -1 },
    // },
  });
  // const requests = await paginate(req.query, query);
  // await RequestAd.populate(requests, {
  //   path: "client",
  //   select: "name phone -_id",
  // });
  // console.log(requests, ad);

  if (requests.length === 0)
    return next(new AppError("No Ads Found at this moment", 404));

  res.status(200).json({
    status: "success",
    results: requests.length,
    data: requests,
  });
});
//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

export const getRequest = catchAsync(async (req, res, next) => {
  const request = await RequestAd.findAll({where:{ id: req.params.requestId} });
  if (!request[0]) return next(new AppError("No Request Found", 404));
  console.log(request[0]);
  request[0].status = true;
  await request[0].save();
  res.status(200).json({
    status: "success",
    data: request[0],
  });
});
/**
 *  const requests = await RequestAd.aggregate([
     {
       $match: {
         $or: [
           {
             price: {
               $lte: budget + budget * 0.1,
               $gte: budget - budget * 0.1,
             },
           },
          
         ],
 area: { $regex: ad.area, $options: "i" } ,
    district: { $regex: ad.district, $options: "i" },
         
       },
     },
   ]);
 */

/**
 * 

router.post("/test", folder.uploadphoto('my data'), (req, res, next) => {
  console.log(req.file);
  const base = req.originalUrl
    .split("/")
    .filter((el) => {
      if (el === "matchingSystem" || el === "propertyFinder") return el;
    })
    .join("/");
  const picUrl = `${req.protocol}://${req.get("host")}/${base}/uploads/${
    req.file.filename
  }`;
  console.log(picUrl);
  res.end();
});
 */
/**
 *  async paginate() {
      // try{
      const page = this.queryObj.page * 1 || 1;
      const limit = this.queryObj.limit * 1 || 10;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
  
      //see the ccount of the documents
      if (this.queryObj.page && this.extra !== null) {
        const count = await this.extra;
        if (skip >= count) throw new AppError("Page Not Found",404);
      }
 */
