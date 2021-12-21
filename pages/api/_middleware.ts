import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { ProfileState } from "../../utils/Reducers/profileReducer";
import { getToken } from "next-auth/jwt";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextMiddleware, NextResponse, NextFetchEvent } from "next/server";
import { getServerSession } from "next-auth";

const secret = process.env.AUTH_CLIENT_SECRET;

const authenticateUser: NextMiddleware = async (req, ev) => {
  console.log(req.cookies, req.ip);
  return NextResponse.next();
};

export default authenticateUser;
