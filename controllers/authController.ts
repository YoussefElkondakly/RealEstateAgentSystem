import { RequestHandler } from "express";
import { AppError } from "../utils/appError";
import { User } from "../model/usermodel";
import { catchAsync } from "../utils/catchAsync";


export const signup: RequestHandler=catchAsync(async (req,res,next)=>{
    try{
        const user = await User.create(req.body)
    }catch(err){}
})