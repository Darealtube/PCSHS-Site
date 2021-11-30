import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function applyAnnouncements(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const announcement = await prisma.announcement.findUnique({
    where: {
      id: req.query.id as string,
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
  });

  res.status(200).json(announcement);
}
