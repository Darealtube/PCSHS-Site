import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../../lib/prisma";

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
      const deletedAnnouncement = await prisma.announcement.delete({
        where: {
          id: req.query.id as string,
        },
      });
      res.status(200).json({ type: deletedAnnouncement.type });
    } catch (error) {
      res.statusMessage =
        "Something wrong occured. The post might have already been deleted, or it might be something else.";
      res.status(400).end();
    }
  } else {
    res.statusMessage = "Forbidden Access.";
    res.status(403).end();
  }
}
