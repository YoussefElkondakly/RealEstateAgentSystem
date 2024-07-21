import { RequestHandler,Request,Response, NextFunction } from 'express';
import {JwtPayload, sign,verify} from 'jsonwebtoken'
import {User} from "./../model/usermodel";
import {catchAsync} from"./../utils/catchAsync"
import Crypto from "crypto"
import { AppError } from '../utils/appError';
import { Op } from 'sequelize';
import {sendEmail}from './../utils/mailSender'
const createHashedToken = function (urlToken:string) {
  return Crypto.createHash("sha256").update(urlToken).digest("hex");
};
const createMailToken = async function (user:User, request:Request, type:string) {
  const verifycode = user.createToken(type);
  await user.save();

  const verifyURL = `${request.protocol}://${request.get(
    "host"
  )}/auth/verifyaccount/${verifycode}`;
  const message = `your Verification Link is: ${verifyURL}`;
  try {
    await sendEmail({
      email: "toto2013elkondkly92@gmail.com",
      subject: `Verify Account`,
      message,
    });
  } catch (err) {
    if (type === "reset") {
      user.passwordResetToken = null;
      user.passwordResetExpires = null;
    } else user.verifyUserToken = null;
    user.save();
    return new AppError(
      "There was an error sending the verification email. Please try again later",
      500
    );
  }
};
const sendJsonResponseToken = function (
    //TODO Fix The type of Data
  userId:number,
  status:number,//status Code
  res:Response,
  message = undefined
) {
  //remember to change the userId
  // console.log(userId);
  const token = sign({ userId }, process.env.JWT_SECURE!, {
    expiresIn: process.env.JWT_DURATION,
  });

  res.status(status).json({
    status: "success",
    token,
    message,
  });
};
export const protect = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !(req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return next(new AppError("You are Not Logged in please log in", 400));
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === "null")
    return next(new AppError("You are Not Logged In Please Login", 400));

  const payload = await verify(token, process.env.JWT_SECURE!)as JwtPayload;
  //here you will compare the Time Stamp of The TOKEN with The Time Stamp of PasswordChanged at
 //FIXME
  const id = payload.userId 
  const user = await User.findByPk(id, {
    attributes: [
      "id",
      "name",
      "phone",
      "role",
      "verified",
      "createdAt",
      "updatedAt",
      "photo",
      "passwordChangedAt",
    ],
  });
  if (!user) return next(new AppError("No User",404))
//   const user = uuser;
  // console.log(user)
  if (!user) return next(new AppError("User not found", 400));
  console.log(user.passwordChangedAt);
  if (user.checkChangedPassword(payload.iat!,user.passwordChangedAt))return next( new AppError( "It seemed That You changed The Password After logging in please login again",404));
  // Object.assign(req,user)
  req.user = user  ;
  next();
});
/**************************************************************/
export const accessManager = function (role:string) {
  return function (req:Request, res:Response, next:NextFunction) {
    if (!(req.user.role === role))
      return next(
        new AppError("You are not allowed to access this route", 400)
      );
    next();
  };
};
export const isVerified :RequestHandler= (req, res, next) => {
  if (!req.user.verified)
    return next(
      new AppError("You Cant make any Ad unless Your account Be Verified",401)
    );
  next();
};
/**************************************************************/

export const signup = catchAsync(async (req, res, next) => {
  if (!req.body.confirmPassword){
return next(new AppError ("You Need To Confirm Password",403))
  }else if(req.body.confirmPassword!==req.body.password){
    return next(new AppError ("Password Not Matched",403))
  }

  if (!req.body.phone.includes("+2")) req.body.phone = "+2" + req.body.phone;
  const newUser = await User.create(req.body);

  if (!newUser) return next(new AppError("problem", 404));
  console.log(newUser);
//TODOFIXME uncomment
  // await createMailToken(newUser, req, "verify");
  let message;
  //her implementing send Verification Email
  sendJsonResponseToken(newUser.id, 201, res, message);
});
//find && findOne
export const login = catchAsync(async (req, res, next) => {
  if (!req.body.phone.includes("+2")) req.body.phone = "+2" + req.body.phone;
  // console.log(req.body.phone)
  if (!req.body.password)
    return next(new AppError("Please Provide the password filed", 404));
  const user = await User.findAll({
    where: {
      phone: req.body.phone,
    },
  });
  // console.dir(user)
  if (!user[0]) return next(new AppError("Incorrect Phone Or Password", 404));
  // console.dir(user);
  const checkPassword = await user[0].checkPassword(
    req.body.password,
    user[0].password
  );
  if (!checkPassword)
    return next(new AppError("Incorrect Phone Or Password", 404));
  sendJsonResponseToken(user[0].id, 201, res);
});
export const verifyAccount = catchAsync(async (req, res, next) => {
  const receivedToken = req.params.verificationcode;
  const userToken = createHashedToken(receivedToken);
  const user = await User.findAll({
    where: {
      verifyUserToken: userToken,
    },
  });
  console.log(user);
  if (!user[0]) return next(new AppError("User not found ", 400));
  if (user[0].verified) return next(new AppError("User already verified", 400));
  user[0].verified = true;
  user[0].verifyUserToken = null;
  await user[0].save();

  res.status(200).json({
    status: "success",
    message: "user has Been Verified please login",
  });
});
export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findAll({ where: { phone: req.body.phone } });
  if (!user) return next(new AppError("User not found", 404));
  await createMailToken(user[0], req, "reset");

  res.status(201).json({
    status: "success",
    message: "Token sent to your email please check your email",
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
    if (!req.body.confirmPassword) {
      return next(new AppError("You Need To Confirm Password", 403));
    } else if (req.body.confirmPassword !== req.body.password) {
      return next(new AppError("Password Not Matched", 403));
    }
  const receivedToken = req.params.code;
  const userToken = createHashedToken(receivedToken);
  const user = await User.findAll({
    where: {
      passwordResetToken: userToken,
      passwordResetExpires: { [Op.gt]: Date.now() },
    },
  });
  // console.log(user[0])
  if (!user[0].passwordResetExpires)return next(new AppError("Prop line 194",404))
    if (!user[0]) return next(new AppError("User not found ", 404));
  if (!(new Date(user[0].passwordResetExpires).getTime() > Date.now()))
    return next(
      new AppError(
        "Password Reset Token Has Expired please send another request",
        400
      )
    ); //send error
  user[0].password = req.body.password;
  user[0].passwordResetToken = null;
  user[0].passwordResetExpires = null;
  user[0].passwordChangedAt = new Date(Date.now() - 1000)+'' ;
  await user[0].save();

  res.status(201).json({
    status: "success",
    message: "Password Rested Successfully please login",
  });
});

export const logout:RequestHandler = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "logged out successfully",
  });
};
