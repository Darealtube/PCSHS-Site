import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../../lib/prisma";
import { Announcement } from "../../../../types/PrismaTypes";

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

  if (token?.role && token?.role == "Government") {
    try {
      const announcement: Announcement = JSON.parse(req.body);
      const { author, id, ...finalAnnouncement } = announcement;
      await prisma.announcement.update({
        where: {
          id: req.query.id as string,
        },
        data: finalAnnouncement,
      });

      res.status(200).end();
    } catch (error) {
      res.statusMessage = "Please provide valid information.";
      res.status(400).end();
    }
  } else {
    res.statusMessage = "Forbidden Access.";
    res.status(403).end();
  }
}
