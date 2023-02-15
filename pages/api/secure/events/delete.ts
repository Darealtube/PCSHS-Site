import { NextApiRequest, NextApiResponse } from "next";
import xss from "xss";
import prisma from "../../../../lib/prisma";

const deleteEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = xss(req.body);
  try {
    const newEvent = await prisma.event.delete({ where: { id } });
    res.status(200).json(newEvent);
  } catch (error) {
    console.error(error);
    res.statusMessage = "Please provide valid information.";
    res.status(400).end();
  }
};

export default deleteEvents;
