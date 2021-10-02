import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function applyAnnouncements(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const applicationAnnouncements = await prisma.announcement.findMany({
    where: {
      type: "Apply Announcement",
    },
    select: {
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
        date: "desc",
      },
    ],
  });

  res.status(200).json(applicationAnnouncements);
}
