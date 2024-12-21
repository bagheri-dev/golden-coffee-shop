import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
const token = request.cookies.get("access_token")?.value;
const role = request.cookies.get("role")?.value;

if (!token || role !== "ADMIN") {
return NextResponse.redirect(new URL("/admin-login", request.url));
}
return NextResponse.next();
}

export const config = {
matcher: ["/admin","/admin/:path*"],
};