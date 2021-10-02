import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function promotion(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const promotionBarInfo = await prisma.promotionBar.findUnique({
    where: {
      id: "Promotional Bar",
    },
    select: {
      promoVid: true,
      environment: true,
    },
  });

  res.status(200).json(promotionBarInfo);
}
