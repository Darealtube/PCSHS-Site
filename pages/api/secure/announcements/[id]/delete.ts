import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function editAnnouncement(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
}
