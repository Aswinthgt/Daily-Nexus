import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;

  const publicPath = pathName === "/auth/login" || pathName === "/auth/register" || pathName === "/";
  if (publicPath) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  
  try{

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    console.log(verified)
  
    if (!verified) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    } else {
      return NextResponse.next();
    }

  }catch(ex){
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

 
}

export const config = {
  matcher: ["/", "/auth/login", "/auth/register", "/dashboard"],
};
