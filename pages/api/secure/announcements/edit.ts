import { NextApiRequest, NextApiResponse } from "next";
import xss from "xss";
import prisma from "../../../../lib/prisma";
import { Announcement } from "../../../../types/PrismaTypes";

export default async function editAnnouncement(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const announcement: Announcement = req.body;
  xss(announcement.id);
  xss(announcement.body);
  xss(announcement.footer);
  xss(announcement.header);
  xss(announcement.type);
  xss(announcement.video);
  for (let i = 0; i < announcement.image.length - 1; ++i) {
    xss(announcement.image[i]);
  }

  try {
    const { author, id, ...finalAnnouncement } = announcement;
    await prisma.announcement.update({
      where: { id: req.query.id as string },
      data: finalAnnouncement,
    });

    res.status(200).end();
  } catch (error) {
    res.statusMessage = "Please provide valid information.";
    res.status(400).end();
  }
}
