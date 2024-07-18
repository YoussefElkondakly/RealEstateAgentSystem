import app from "./app";
import { config } from "dotenv";
import mongoose from "mongoose";
import { Sequelize } from "sequelize-typescript";

config()

/**
 * mongoose.connect(LocDB).then(co=>{console.log("Connected Successfully to "+co.connections[0].name+" Database")
    app.listen(port,()=>{
        console.log("Server Starts ON Port "+port)
        // console.log(process.env.NODE_ENV)
        })
})
        const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const DB = process.env.DB_CONNECT.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);

const sequelize = new Sequelize(DB);
module.exports=sequelize

 */
//here will implement the nested connection  with data Bases

const pgP = process.env.PG_PASSWORD||'';
const postgres =
  typeof process.env.DB_POSTGRES === "string"
    ? process.env.DB_POSTGRES.replace("<PASSWORD>", pgP)
    : '';

// const mongoP = process.env.MONGO_PASSWORD;
const mongo = process.env.DB_MONGO||''
const port = process.env.PORT || 3000;
const sequelize = new Sequelize(postgres);
sequelize.addModels([__dirname + "/model/adsmodel.js"]);
// console.log(__dirname)
/**
 * 
 */
mongoose.connect(mongo).then((co) => {
  console.log(
    "Connected Successfully to " + co.connections[0].name + " Mongo Database\n"
  );
  return sequelize.sync(

    {force:true}
)}).then(()=>{
    console.log('PostGres DB connection successful\n')
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
}).catch(err=>console.log(err));

export {sequelize}