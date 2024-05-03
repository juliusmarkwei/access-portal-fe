import { withAuth } from "next-auth/middleware";

import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        const pathname = req.nextUrl.pathname;

        const isAuth = req.cookies.get("refresh_token");

        const sensitiveRoutes = [
            "/",
            "/dashboard",
            "/dashboard/contact",
            "/dashboard/sms",
            "/dashboard/sms-logs",
            "/dashboard/templates",
        ];

        const isAccessingSensitiveRoute = sensitiveRoutes.includes(pathname);

        const sensitiveRoutesAfterLogin = [
            "/login",
            "/signup",
            "/forget-password",
            "/reset-password",
            "/user-activate",
            "/reset-activation",
        ];

        const isAccessingSensitiveRoutesAfterLogin =
            sensitiveRoutesAfterLogin.includes(pathname);

        if (!isAuth && isAccessingSensitiveRoute) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        if (pathname == "/") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        if (isAuth && isAccessingSensitiveRoutesAfterLogin) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    },
    {
        callbacks: {
            async authorized() {
                return true;
            },
        },
    }
);

export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/forget-password",
        "/reset-password",
        "/reset-activation",
    ],
};
