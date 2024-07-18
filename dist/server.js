"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const app_1 = __importDefault(require("./app"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const sequelize_typescript_1 = require("sequelize-typescript");
(0, dotenv_1.config)();
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
const pgP = process.env.PG_PASSWORD || '';
const postgres = typeof process.env.DB_POSTGRES === "string"
    ? process.env.DB_POSTGRES.replace("<PASSWORD>", pgP)
    : '';
// const mongoP = process.env.MONGO_PASSWORD;
const mongo = process.env.DB_MONGO || '';
const port = process.env.PORT || 3000;
const sequelize = new sequelize_typescript_1.Sequelize(postgres);
exports.sequelize = sequelize;
sequelize.addModels([__dirname + "/model/adsmodel.js"]);
// console.log(__dirname)
/**
 *
 */
mongoose_1.default.connect(mongo).then((co) => {
    console.log("Connected Successfully to " + co.connections[0].name + " Mongo Database\n");
    return sequelize.sync({ force: true });
}).then(() => {
    console.log('PostGres DB connection successful\n');
    app_1.default.listen(port, () => {
        console.log("Server is running on port " + port);
    });
}).catch(err => console.log(err));
