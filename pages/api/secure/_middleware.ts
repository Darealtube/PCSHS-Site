// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextMiddleware, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";

const secret = process.env.AUTH_CLIENT_SECRET;

const authenticateUser: NextMiddleware = async (req, _ev) => {
  const token = req.cookies["next-auth.session-token"];
  try {
    const user = await decode({ token, secret: secret as string });
    if (user && user?.role == "Government") {
      return NextResponse.next();
    } else {
      return new Response(JSON.stringify({}), {
        status: 401,
        statusText: "Unauthorized Access.",
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({}), {
      status: 401,
      statusText: "Unauthenticated Access.",
    });
  }
};

export default authenticateUser;
