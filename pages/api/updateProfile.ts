import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { ProfileState } from "../../utils/Reducers/profileReducer";

export default async function updateProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const profile: ProfileState = JSON.parse(req.body);

  try {
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
}
