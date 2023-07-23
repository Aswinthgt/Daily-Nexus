import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function verifyToken(req :NextRequest) {
   try{
    const reqBody = req.cookies.get("token");
    const token = reqBody?.value;

    const tokenData = jwt.verify(token!,process.env.JWT_SECRET_KEY!);
    if(tokenData){
        return tokenData;
    }else {
        throw new Error("token Verication Failed")
    }
   }catch(er){
    throw new Error("token Verication Failed")
   }
   

}