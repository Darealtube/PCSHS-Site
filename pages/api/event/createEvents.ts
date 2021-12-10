import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";

const secret = process.env.AUTH_CLIENT_SECRET;
const signingKey = process.env.JWT_SIGNING_KEY;
const encryptionKey = process.env.JWT_ENCRYPTION_KEY;
const encryption = true;

const createEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({
    req,
    secret,
    signingKey,
    encryptionKey,
    encryption,
  });

  if (token?.role && token?.role == "Government") {
    try {
      const event = JSON.parse(req.body);
      const newEvent = await prisma.event.create({
        data: event,
      });
      res.status(200).json(newEvent);
    } catch (error) {
      res.statusMessage = "Please provide valid information.";
      res.status(400).end();
    }
  } else {
    res.statusMessage = "Forbidden Access.";
    res.status(403).end();
  }
};

export default createEvents;
