import cloudinary from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";

const cloudinaryHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse
) => {
  // Must be UNIX format
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Signature
  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.NEXT_PUBLIC_CLOUDINARY_SECRET as string //API Secret (MUST BE HIDDEN IN ENV)
  );

  res.statusCode = 200;
  res.json({ signature, timestamp });
};

export default cloudinaryHandler;
