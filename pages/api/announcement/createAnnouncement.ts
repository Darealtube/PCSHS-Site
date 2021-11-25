import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";
import { AnnounceState } from "../../../utils/Reducers/announceReducer";

const secret = process.env.AUTH_CLIENT_SECRET;
const signingKey = process.env.JWT_SIGNING_KEY;
const encryptionKey = process.env.JWT_ENCRYPTION_KEY;
const encryption = true;

const createAnnouncement = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const date = new Date();
  const token = await getToken({
    req,
    secret,
    signingKey,
    encryptionKey,
    encryption,
  });

  if (token) {
    try {
      const announcement: AnnounceState = JSON.parse(req.body);
      const newAnnouncement = await prisma.announcement.create({
        data: {
          ...announcement,
          date: new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
            .toISOString()
            .split("T")[0],
        },
      });
      res.status(200).json(newAnnouncement);
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

export default createAnnouncement;
