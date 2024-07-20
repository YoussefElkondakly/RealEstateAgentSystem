import { RequestHandler } from "express";

//this for reducing the try Catch calling
export const catchAsync = function (fn: RequestHandler|Promise){
  return (req,res,next)=>fn(req,res,next).catch
  // const shit: RequestHandler = (req, res, next):Promise =>
  //   fn(req, res, next).catch((err) => next(err));
  // return shit;
};


//passing async function with type Request Handler