import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function getEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = req.query;
  const events = await prisma.event.findMany({
    where: {
      month: req.query.month ? +req.query.month : 1,
      year: req.query.year ? +req.query.year : 1999,
    },
    select: {
      id: true,
      title: true,
      description: true,
      day: true,
      month: true,
      year: true,
    },
  });

  res.status(200).json(events);
}
