import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  try {
    const pathName = req.nextUrl.pathname;

    const publicPath =
      pathName === "/auth/login" ||
      pathName === "/auth/register" ||
      pathName === "/";
    if (publicPath) {
      return NextResponse.next();
    }

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    } else {
      return NextResponse.next();
    }
  } catch (ex) {
    console.log(ex, "error area");
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/auth/login", "/auth/register", "/dashboard"],
};
