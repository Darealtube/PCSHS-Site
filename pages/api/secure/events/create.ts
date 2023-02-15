import { NextApiRequest, NextApiResponse } from "next";
import xss from "xss";
import prisma from "../../../../lib/prisma";

const createEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  const pcshsEvent = req.body;
  try {
    xss(pcshsEvent.title);
    xss(pcshsEvent.description);

    const newEvent = await prisma.event.create({ data: pcshsEvent });
    res.status(200).json(newEvent);
  } catch (error) {
    console.error(error);
    res.statusMessage = "Please provide valid information.";
    res.status(400).end();
  }
};

export default createEvents;
