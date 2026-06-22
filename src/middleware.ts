import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/signin", "/signup", "/"]);

export default convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    const isAuthenticated = await convexAuth.isAuthenticated();
    if (!isPublicPage(request) && !isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/signin");
    }
    if (isPublicPage(request) && isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/dashboard");
    }
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
