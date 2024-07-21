import {default as express,Request,
Response,
NextFunction}  from "express";
import testLocalRoutes from "./routes/testlocalroutes";
import authRoutes  from "./routes/authRoutes" 
import userRoutes  from "./routes/userRoutes" ;
import agentRoutes  from "./routes/agentRoutes" ;
import clientRoutes  from "./routes/clientRoutes" ;
import adminRoutes  from "./routes/adminRoutes" ;
import { errHandler } from "./utils/errHandler";
import { AppError } from "./utils/appError";
import { JsonWebTokenError } from "jsonwebtoken";

const app=express()


const baseUrl = "/matchingSystem/propertyFinder/";
app.use(baseUrl + "uploads/", express.static("uploads"));
app.use(express.json());

app.use(baseUrl + "auth", authRoutes);
app.use(baseUrl + "user", userRoutes);
app.use(baseUrl + "agent", agentRoutes);
app.use(baseUrl + "client", clientRoutes);
app.use(baseUrl + "admin", adminRoutes);

app.all("*", (req:Request, res:Response, next:NextFunction) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  next(err);
});
app.use(errHandler);
app.use("/testlocal", testLocalRoutes);
export default app 