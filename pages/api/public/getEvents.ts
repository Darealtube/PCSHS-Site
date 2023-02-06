import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function getEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { d = 1, y = 1999, m = 1, c, l = 10 } = req.query;
  const events = await prisma.event.findMany({
    where: {
      day: +d,
      month: +m,
      year: +y,
      id: { lt: c as string },
    },
    select: {
      id: true,
      title: true,
      description: true,
      day: true,
      month: true,
      year: true,
    },
    orderBy: [{ id: "desc" }],
    take: +l,
  });

  res.status(200).json(events);
}
