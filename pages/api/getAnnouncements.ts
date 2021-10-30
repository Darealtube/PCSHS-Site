import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function applyAnnouncements(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const announcements = await prisma.announcement.findMany({
    where: {
      OR: [{ type: "SSG Announcement" }, { type: "School Announcement" }],
      id: { lt: req.query.cursor as string },
    },
    select: {
      id: true,
      header: true,
      body: true,
      footer: true,
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
    orderBy: [
      {
        id: "desc",
      },
    ],
    take: +req.query.limit,
  });

  res.status(200).json(announcements);
}
