import { NextApiRequest, NextApiResponse } from "next";
import xss from "xss";
import prisma from "../../../../lib/prisma";
import { AnnounceState } from "../../../../utils/Reducers/announceReducer";

const createAnnouncement = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const date = new Date();
  const announcement: AnnounceState = req.body;

  xss(announcement.body);
  xss(announcement.footer);
  xss(announcement.header);
  xss(announcement.video);
  for (let i = 0; i < announcement.image.length - 1; ++i) {
    xss(announcement.image[i]);
  }

  try {
    const dateToday = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .split("T")[0];

    const newAnnouncement = await prisma.announcement.create({
      data: { ...announcement, type: "Apply Announcement", date: dateToday },
    });
    res.status(200).json(newAnnouncement);
  } catch (error) {
    res.statusMessage = "Please provide valid information.";
    res.status(400).end();
  }
};

export default createAnnouncement;
