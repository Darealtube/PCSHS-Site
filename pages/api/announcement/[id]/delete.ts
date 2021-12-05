import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../../lib/prisma";

const secret = process.env.AUTH_CLIENT_SECRET;
const signingKey = process.env.JWT_SIGNING_KEY;
const encryptionKey = process.env.JWT_ENCRYPTION_KEY;
const encryption = true;

export default async function editAnnouncement(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({
    req,
    secret,
    signingKey,
    encryptionKey,
    encryption,
  });

  if (token) {
    try {
      await prisma.announcement.delete({
        where: {
          id: req.query.id as string,
        },
      });
      res.status(200).end();
    } catch (error) {
      res.statusMessage =
        "Something wrong occured. The post might have already been deleted, or it might be something else.";
      res.status(400).end();
    }
  } else {
    res.statusMessage = "Unauthorized Access. Please Log In first.";
    res.status(401).end();
  }
}
