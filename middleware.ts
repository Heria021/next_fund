import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        return NextResponse.next();
    },
    {
        pages: {
            signIn: "/api/auth/signin",
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*"],
};