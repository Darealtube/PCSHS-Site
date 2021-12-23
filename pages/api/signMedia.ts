import cloudinary from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.AUTH_CLIENT_SECRET;

const cloudinaryHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Must be UNIX format

  const token = await getToken({
    req,
    secret: secret as string,
  });

  const timestamp = Math.round(new Date().getTime() / 1000);

  // Signature
  if (token) {
    try {
      const signature = cloudinary.v2.utils.api_sign_request(
        {
          timestamp: timestamp,
        },
        process.env.NEXT_PUBLIC_CLOUDINARY_SECRET as string //API Secret (MUST BE HIDDEN IN ENV)
      );

      res.status(200).json({ signature, timestamp });
    } catch (error) {
      res.statusMessage = "Please provide valid information.";
      res.status(400).end();
    }
  } else {
    res.statusMessage = "Unauthorized Access. Please Log In first.";
    res.status(401).end();
  }
};

export default cloudinaryHandler;
