import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";

const secret = process.env.AUTH_CLIENT_SECRET;
const signingKey = process.env.JWT_SIGNING_KEY;
const encryptionKey = process.env.JWT_ENCRYPTION_KEY;
const encryption = true;

const updateEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({
    req,
    secret,
    signingKey,
    encryptionKey,
    encryption,
  });

  if (token) {
    try {
      const event = JSON.parse(req.body);
      const newEvent = await prisma.event.update({
        where: {
          id: event.id,
        },
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
  } else {
    res.statusMessage =
      "Unauthorized Access. You do not have administrative privilages.";
    res.status(401).end();
  }
};

export default updateEvents;
