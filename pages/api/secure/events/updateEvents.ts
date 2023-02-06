import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

const updateEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const event = req.body;
    const newEvent = await prisma.event.update({
      where: { id: event.id },
      data: {
        title: event.title,
        description: event.description,
      },
    });
    res.status(200).json(newEvent);
  } catch (error) {
    res.statusMessage = "Please provide valid information.";
    res.status(400).end();
  }
};

export default updateEvents;
