import {User} from './../model/usermodel'
import { catchAsync } from './../utils/catchAsync'; 
import {AppError}  from "../utils/appError";
// import { where } from 'sequelize';
// const { where } = require("sequelize");

export const getMyProfile = catchAsync(async (req, res, next) => {
  // console.log(req.user)
  // const user = await User.findByPk(req.user._id);
  // if (!user) return next(new AppError("User Not found", 404));
  //TODO If you want to edit the receved data you can make find
  res.status(200).json({
    status: "success",
    data: 
      req.user,
    
  });
});
export const updateProfile = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword || req.body.phone)
    return next(new AppError("You Cant Update Password Or phone Here", 400));
  const user = await User.update(req.body, {
    where: { id: req.user.id },
    returning: [
        "id",
        "name",
        "phone",
        "role",
        "verified",
        "createdAt",
        "updatedAt",
        "photo",
      ],
    
  });
  // console.log(user)
  //prevent
  if (!user) return next(new AppError("User Not found", 404));
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  if (!req.body.confirmPassword) {
    return next(new AppError("You Need To Confirm Password", 403));
  } else if (req.body.confirmPassword !== req.body.newPassword) {
    return next(new AppError("Password Not Matched", 403));
  }
  const user = await User.findByPk(req.user.id)
  if (!user) return next(new AppError("User Not found", 404));
  if (!req.body.newPassword)
    return next(new AppError("Password does not match ", 400));
  const checkOldPassword = await user.checkPassword(
    req.body.password,
    user.password
  );
//   console.log(checkOldPassword);
  if (!checkOldPassword)
    return next(
      new AppError("Please make sure you typed The Correct Password",404)
    );
  if ((req.body.newPassword === req.body.confirmPassword)) user.passwordChangedAt=new Date(Date.now()-1000)+''
    user.password = req.body.newPassword;
  
  await user.save();
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
export const deleteProfile=catchAsync(async (req,res,next)=>{
  //we can implement await User.destroy({where: {id:req.user.id},}); Too
  const user = await User.update(
    { status: false },
    {
      where: {
        id: req.user.id,
      },
    }
  );
  if (!user) return next(new AppError("something went wrong", 401));

  res.status(204).json({
    status: "success",
    data: null,
  });
})