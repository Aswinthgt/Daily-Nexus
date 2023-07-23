import { verifyToken } from "@/helper/jwt";
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/dbconfig/dbconfig";
import userAuth from "@/dbconfig/models/auth";
import { Types } from "mongoose"

connectDb();

export async function GET(req: NextRequest) {
  const reqBody = req.cookies.get("token");
  const token = reqBody?.value;
  if (!token) {
    return NextResponse.json(
      { message: "user Validation Found , Please Login" },
      { status: 404 }
 );
  }
  const verifiedToken: any = verifyToken(token)

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
      { message: "user Validation Found , Please Login" },
      { status: 404 }
 );
  } else {
    return NextResponse.json(
      { data: userData, message: "Welcome To Information + Intelligence" },
      { status: 200 }
    );
  }


} 