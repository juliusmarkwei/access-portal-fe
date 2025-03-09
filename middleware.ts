import { NextResponse } from "next/server";

export function middleware(req) {
	const pathname = req.nextUrl.pathname;

	// Extract token from headers (since req.cookies doesn't work well in middleware)
	const cookieHeader = req.headers.get("cookie");
	const isAuth = cookieHeader?.includes("access-token=");

	// Protected routes that require authentication
	const sensitiveRoutes = [
		"/dashboard",
		"/dashboard/generate-key",
		"/dashboard/manage-keys",
		"/admin/dashboard",
		"/admin/dashboard/manage-keys",
		"/admin/dashboard/schools",
		"/admin/dashboard/school-active-key-lookup",
	];

	const isAccessingSensitiveRoute = sensitiveRoutes.includes(pathname);

	// Auth pages that should not be accessible when logged in
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

	// Redirect unauthenticated users trying to access protected pages
	if (!isAuth && isAccessingSensitiveRoute) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	// Redirect authenticated users away from login/signup pages
	if (isAuth && isAccessingSensitiveRoutesAfterLogin) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	// Redirect "/" to "/dashboard" if authenticated
	if (pathname === "/" && isAuth) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}
}

export const config = {
	matcher: [
		"/",
		"/login",
		"/signup",
		"/forget-password",
		"/reset-password",
		"/reset-activation",
		"/user-activate",
		"/dashboard",
		"/dashboard/generate-key",
		"/dashboard/manage-keys",
		"/admin/dashboard",
		"/admin/dashboard/manage-keys",
		"/admin/dashboard/schools",
		"/admin/dashboard/school-active-key-lookup",
	],
};
