import bcrypt from "bcrypt";
import userAuth from "@/dbconfig/models/auth";
import { NextResponse, NextRequest } from "next/server";
import connectDb from "@/dbconfig/dbconfig";
import {sign} from "jsonwebtoken";

connectDb();

export async function POST(req: NextRequest) {
     const reqBody = await req.json();
     const { email, password } = reqBody;

     const findedUser = await userAuth.findOne({ email: email });

     if (!findedUser) {
          return NextResponse.json(
               { message: "user Not Found , Please Register One" },
               { status: 404 }
          );
     }

     const passwordTrue = await bcrypt.compare(password, findedUser.password);

     if (!passwordTrue) {
          return NextResponse.json(
               { message: "password incorrect" },
               { status: 401 }
          );
     }

     const createdToken = sign(
          { id: findedUser.Id },
          process.env.JWT_SECRET_KEY!,
          {
               expiresIn: "24h",
          }
     );

     if (!createdToken) {
          return NextResponse.json({ message: "Login Failed" }, { status: 403 });
     }

     const response = NextResponse.json(
          { message: "Login Sucess" },
          { status: 200 }
     );
     response.cookies.set("token", createdToken, { httpOnly: true });
     return response;
}
