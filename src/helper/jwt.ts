import { verify } from "jsonwebtoken";

export function verifyToken(token:string) {
   try{

    const tokenData = verify(token,process.env.JWT_SECRET_KEY!);
    if(tokenData){
        return tokenData;
    }else {
        throw new Error("token Verication Failed")
    }
   }catch(er){
    throw new Error("token Verication Failed")
   }
   

}