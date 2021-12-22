import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

const deleteEvents = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = JSON.parse(req.body);
      const newEvent = await prisma.event.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json(newEvent);
    } catch (error) {
      res.statusMessage = "Please provide valid information.";
      res.status(400).end();
    }
};

export default deleteEvents;
