// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextMiddleware, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";

const secret = process.env.AUTH_CLIENT_SECRET;

const authenticateUser: NextMiddleware = async (req, _ev) => {
  const token = req.cookies["next-auth.session-token"];

  console.log(req.cookies);
  try {
    const user = await decode({ token, secret: secret as string });
    if (user && user?.role == "Government") {
      return NextResponse.next();
    } else {
      return new Response(JSON.stringify({ message: "403 Forbidden." }), {
        status: 403,
        statusText: "Forbidden Access.",
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "401 Unauthenticated" }), {
      status: 401,
      statusText: "Unauthenticated Access.",
    });
  }
};

export default authenticateUser;
