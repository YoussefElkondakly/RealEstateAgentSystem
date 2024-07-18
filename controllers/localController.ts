import { RequestHandler } from "express"
import { Ads } from "../model/adsmodel"
const dat:string[]=['youssef','mohamed','fathi','abdallah' ]

export const ad:RequestHandler=async (req,res,next)=>{
  const ad=await Ads.create(req.body)
}
export const getAll:RequestHandler=(req,res,next)=>{
const data= dat
res.status(200).json({data})
}
export const getOne:RequestHandler=(req,res,next)=>{
    const id:string= req.params.id
    let index:number
    if(typeof id==='number')index =id;
else index=Number(id)
const data:string= dat[index]
if(!data)return res.status(404).json({  message:'id not found'})
    res.status(200).json({data})
    }

    export const addOne:RequestHandler=(req,res,next)=>{
        const data:string=req.query.data as string

        dat.push(data)
        res.status(201).json({dat})

    }
export const deleteOne: RequestHandler = (req, res, next) => {
  const id: string = req.params.id;
  let index: number;
  if (typeof id === "number") index = id;
  else index = Number(id);
  const data: string = dat[index];
  if (!data) return res.status(404).json({ message: "id not found" });

  dat.splice(index, 1);
  res.status(200).json({ dat });
};

export const editOne: RequestHandler = (req, res, next) => {
  const id: string = req.params.id;
  const data:string=req.query.data as string
  let index: number;
  if (typeof id === "number") index = id;
  else index = Number(id);
  if(index&& dat.length>index){
    dat[index] = data;
    res.status(201).json({ dat });
  }else{return res.status(404).json({ message: "invalid Id" });}
   
//   if (!data) 
  
};