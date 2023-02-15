import { NextApiRequest, NextApiResponse } from "next";
import xss from "xss";
import prisma from "../../../../lib/prisma";

export default async function editAnnouncement(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.body;
  xss(id);
  try {
    const deletedAnnouncement = await prisma.announcement.delete({
      where: { id },
    });
    res.status(200).json({ type: deletedAnnouncement.type });
  } catch (error) {
    res.statusMessage =
      "Something wrong occured. The post might have already been deleted, or it might be something else.";
    res.status(400).end();
  }
}
