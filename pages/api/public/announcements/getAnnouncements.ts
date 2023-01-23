import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function applyAnnouncements(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(req.query.type == "apply" || req.query.type == "normal")) {
    return res.status(400).end();
  }

  const announcementType =
    req.query.type == "apply"
      ? { type: "Apply Announcement" }
      : { OR: [{ type: "SSG Announcement" }, { type: "School Announcement" }] };

  const announcements = await prisma.announcement.findMany({
    where: {
      ...announcementType,
      id: { lt: req.query.cursor as string },
    },
    select: {
      id: true,
      header: true,
      image: true,
      video: true,
      date: true,
      author: {
        select: {
          image: true,
          name: true,
        },
      },
    },
    orderBy: [{ id: "desc" }],
    take: req.query.limit ? +req.query.limit : 10,
  });

  res.status(200).json(announcements);
}
