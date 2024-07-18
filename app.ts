import express  from "express";
import testLocalRoutes from "./routes/testlocalroutes";
 const app=express()
app.use(express.json())

app.use("/testlocal", testLocalRoutes);
export default app 