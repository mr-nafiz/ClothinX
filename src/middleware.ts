import { clerkMiddleware } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

// Only these Clerk user IDs can access /admin
const ADMIN_IDS = [
  "user_36XqSPvXLylP287PQqklPdkCG3W", // <-- replace with your real Clerk user IDs
  "user_36Y9DUsawvF63RPfOGAvtmeqdiD",
];

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    // 1. User is not logged in → redirect to sign-in
    if (!userId) {
      return notFound();
    }

    // 2. Logged in but NOT admin → block access
    if (!ADMIN_IDS.includes(userId)) {
      return notFound();
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
