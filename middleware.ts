import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { EventSchema, AnnouncementSchema } from "./utils/joiSchemas";

export default withAuth(
  async (req) => {
    if (req.nextUrl.pathname.startsWith("/api/secure/events/")) {
      const pcshsEvent = await req.json();
      try {
        EventSchema.validateAsync(pcshsEvent);
      } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({}), {
          status: 400,
          statusText: "Invalid information has been provided.",
        });
      }
    }

    if (req.nextUrl.pathname.startsWith("/api/secure/announcements/")) {
      const pcshsAnnouncement = await req.json();
      try {
        AnnouncementSchema.validateAsync(pcshsAnnouncement);
      } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({}), {
          status: 400,
          statusText: "Invalid information has been provided.",
        });
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => {
        return true;
      },
    },
  }
);

export const config = { matcher: ["/api/secure/:path*", "/api/public/:path*"] };
