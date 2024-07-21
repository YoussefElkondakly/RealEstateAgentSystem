import {Length,AllowNull,Column,BeforeUpdate,BeforeCreate,Table,Model,DataType,HasMany} from 'sequelize-typescript'
import {isMobilePhone} from 'validator'
import { hash,compare } from 'bcrypt';
import * as crypto from "crypto"
import { Ads } from './adsmodel';
import { RequestAd } from './requestModel';
 @Table
 export class User extends Model {
   @Column({
     type: DataType.STRING,
     allowNull: false,
     validate: {
       notNull: {
         msg: "Name is required",
       },
     },
   })
   name!: string;

   @Column({
     type: DataType.STRING,
     allowNull: false,
     unique: true,

     validate: {
       notNull: {
         msg: "Phone is required",
       },
       isMobilePhone(val: string) {
         if (
           !isMobilePhone(val, ["ar-EG"], {
             strictMode: true,
           })
         )
           throw new Error("Wrong Phone Number");
       },
     },
   })
   phone!: string;

   @Column({
     allowNull: false,
     defaultValue: "client",
     validate: {
       notNull: {
         msg: "Phone is required",
       },
       isIn: {
         args: [["client", "agent"]],
         msg: "The Roles Must Be Either Client or Agent",
       },
     },
   })
   role!: string;
   @Column
   photo!: string;

   @Length({
     min: 8,
     msg: "The Password Field Must Be at Least 8 Characters",
   })
   @Column({
     type: DataType.STRING,
     allowNull: false,
     validate: {
       notNull: {
         msg: "Password is required",
       },
     },
   })
   password!: string;

   @Column({
     type: DataType.BOOLEAN,
     defaultValue: false,
   })
   verified!: boolean;
   @Column({
     type: DataType.BOOLEAN,
     defaultValue: true,
   })
   status!: string;
   @AllowNull(true)
   @Column({
     type: DataType.DATE,
   })
   passwordChangedAt!: string | null;
   @AllowNull(true)
   @Column({
     type: DataType.STRING,
   })
   passwordResetToken!: string | null;
   @AllowNull(true)
   @Column({
     type: DataType.DATE,
   })
   passwordResetExpires!: string | null;
   @AllowNull(true)
   @Column({
     type: DataType.STRING,
   })
   verifyUserToken!: string | null;

   checkChangedPassword(jwtIat: number,passwordChangedAt:string|null) {
   console.log(passwordChangedAt);
     if (passwordChangedAt) {
       const passwordChangedAtTimeStamp: number = new Date(
         passwordChangedAt
        ).getTime();
        const changedPasswordTime: number = passwordChangedAtTimeStamp / 1000;
        console.log(jwtIat, changedPasswordTime,jwtIat < changedPasswordTime);
       return jwtIat < changedPasswordTime;
     }
     return false;
   }
   createToken(type: string) {
     if (type === "reset") {
       const resetToken = crypto.randomBytes(32).toString("hex");
       this.passwordResetToken = crypto
         .createHash("sha256") //
         .update(resetToken) //
         .digest("hex"); //
       // console.log({ resetToken }, this.passwordResetToken);
       this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000) + "";

       return resetToken;
     }
     if (type === "verify") {
       const verifyToken = crypto.randomBytes(32).toString("hex");
       this.verifyUserToken = crypto
         .createHash("sha256") //
         .update(verifyToken) //
         .digest("hex");
       //

       return verifyToken;
     }
   }
   async checkPassword(givenPass: string, documentPass: string) {
     //  console.log(this);
     return await compare(givenPass, documentPass);
   }

   @BeforeUpdate
   @BeforeCreate
   static async hashingPassword(user: User) {
     user.password = await hash(user.password, 12);
   }
   @HasMany(() => Ads)
   ads!: Ads[];
   @HasMany(() => RequestAd)
   requestAd!: RequestAd[];
 }

/*
Ads.belongsTo(User, { constrains: true, onDelete: "CASCADE" });
 User.hasMany(Ads);
 RequestAd.belongsTo(User, { constrains: true, onDelete: "CASCADE" });
 User.hasMany(RequestAd);
}
*/  