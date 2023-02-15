import { NextApiRequest, NextApiResponse } from "next";
import xss from "xss";
import prisma from "../../../../lib/prisma";

const updateEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  const pcshsEvent = req.body;
  try {
    xss(pcshsEvent.title);
    xss(pcshsEvent.description);
    xss(pcshsEvent.id);

    const newEvent = await prisma.event.update({
      where: { id: pcshsEvent.id },
      data: {
        title: pcshsEvent.title,
        description: pcshsEvent.description,
      },
    });

    res.status(200).json(newEvent);
  } catch (error) {
    console.error(error);
    res.statusMessage = "Please provide valid information.";
    res.status(400).end();
  }
};

export default updateEvents;
