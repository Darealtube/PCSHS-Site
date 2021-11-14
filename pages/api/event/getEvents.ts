import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { rateLimit } from "../../_app";

export default async function getEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = req.query;
  const remaining = await rateLimit();
  console.log(remaining);
  const events = await prisma.event.findMany({
    where: {
      month: +params.month,
      year: +params.year,
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
