import { verifyToken } from "@/helper/jwt";
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/dbconfig/dbconfig";
import userAuth from "@/dbconfig/models/auth";
import { Types } from "mongoose"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

connectDb();

export async function GET(req: NextRequest) {

  try {

    const session: any = await getServerSession(authOptions)
    let userData: any;

    if (session.id) {
      userData = await userAuth.findOne({ _id: session.id }, { _id: 0, userName: 1, email: 1 });
    }

    if (session.googleId) {
      userData = await userAuth.findOne({ googleId: session.googleId }, { _id: 0, userName: 1, email: 1 });
    }


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

  } catch (er) {
    return NextResponse.json(
      { message: "OPPS.. Unhandled Eroor , Sorry we are Leaving" },
      { status: 400 }
    );
  }





} 