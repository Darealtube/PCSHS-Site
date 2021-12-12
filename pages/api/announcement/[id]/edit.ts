import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../../lib/prisma";
import { Announcement } from "../../../../types/PrismaTypes";

const secret = process.env.AUTH_CLIENT_SECRET;

export default async function editAnnouncement(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({
    req,
    secret: secret as string,
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
