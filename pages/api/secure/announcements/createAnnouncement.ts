import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { AnnounceState } from "../../../../utils/Reducers/announceReducer";

const createAnnouncement = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const date = new Date();

  try {
    const announcement: AnnounceState = JSON.parse(req.body);
    const newAnnouncement = await prisma.announcement.create({
      data: {
        ...announcement,
        date: new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
    });
    res.status(200).json(newAnnouncement);
  } catch (error) {
    res.statusMessage = "Please provide valid information.";
    res.status(400).end();
  }
};

export default createAnnouncement;
