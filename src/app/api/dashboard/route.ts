import { verifyToken } from "@/helper/jwt";
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/dbconfig/dbconfig";
import userAuth from "@/dbconfig/models/auth";
import { Types } from "mongoose"

connectDb();

export async function GET(req: NextRequest) {

  try{

  const verifiedToken: any = verifyToken(req)

  if (!verifiedToken) {
    return NextResponse.json(
      { message: "user Validation Found , Please Login" },
      { status: 404 }
 );
  }
  const id = new Types.ObjectId(verifiedToken.id)
  const userData = await userAuth.findOne({ _id: id }, { _id: 0, userName: 1, email: 1 });
  if (!userData) {
    return NextResponse.json(
      { message: "user Validation error occur , Please Login" },
      { status: 404 }
 );
  } else {
    return NextResponse.json(
      { data: userData, message: "Welcome To Information + Intelligence" },
      { status: 200 }
    );
  }

  }catch(er){
    return NextResponse.json(
      { message: "OPPS.. Unhandled Eroor , Sorry we are Leaving" },
      { status: 400 }
    );
  }


  


} 