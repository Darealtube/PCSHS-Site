export const uploadImages = async (images: FileList | string[]) => {
  let urls: string[] = [];
  const data = new FormData();

  for (let i = 0; i < images.length; i++) {
    let image = images[i];
    const { signature, timestamp } = await getSignature(); // Get returned sign and timestamp
    data.append("file", image);
    data.append("signature", signature); // Signature
    data.append("timestamp", timestamp); // Timestamp
    data.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY as string);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    urls.push(await file.secure_url);
  }
  return urls;
};

export const uploadVideo = async (video: string | File) => {
  let url: string;
  const data = new FormData();

  const { signature, timestamp } = await getSignature(); // Get returned sign and timestamp
  data.append("file", video);
  data.append("signature", signature); // Signature
  data.append("timestamp", timestamp); // Timestamp
  data.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY as string);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload`,
    {
      method: "POST",
      body: data,
    }
  );
  const file = await res.json();
  url = file.secure_url;

  return url;
};

const getSignature = async () => {
  //Call API which handles the signature and timestamp
  const response = await fetch("/api/signMedia");
  //Get the response in JSON format
  const data = await response.json();
  //Extract signature and timestamp
  const { signature, timestamp } = data;
  return { signature, timestamp };
};
