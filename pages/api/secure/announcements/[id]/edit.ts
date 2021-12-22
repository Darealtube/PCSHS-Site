import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { Announcement } from "../../../../../types/PrismaTypes";

export default async function editAnnouncement(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
}
