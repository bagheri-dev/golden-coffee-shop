import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
const role = request.cookies.get("role")?.value;
if (role !== "ADMIN") {
    return NextResponse.redirect(new URL("/404", request.url));
}
return NextResponse.next();
}

export const config = {
matcher: ["/admin","/admin/:path*"],
};