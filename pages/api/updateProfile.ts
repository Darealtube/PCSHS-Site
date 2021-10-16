import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { ProfileState } from "../../utils/Reducers/profileReducer";
import { getToken } from "next-auth/jwt";

const secret = process.env.AUTH_CLIENT_SECRET;
const signingKey = process.env.JWT_SIGNING_KEY;
const encryptionKey = process.env.JWT_ENCRYPTION_KEY;
const encryption = true;

export default async function updateProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({
    req,
    secret,
    signingKey,
    encryptionKey,
    encryption,
  });

  if (token) {
    try {
      const profile: ProfileState = JSON.parse(req.body);
      await prisma.profile.update({
        where: {
          name: profile.name,
        },
        data: profile,
      });
      res.status(200).end();
    } catch (error) {
      res.statusMessage = "Please provide valid information.";
      res.status(400).end();
    }
  } else {
    res.statusMessage = "Unauthorized Access. Please Log In first.";
    res.status(401).end();
  }
}
