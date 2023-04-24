export const uploadImages = async (images: FileList | string[]) => {
  const urls: string[] = [];
  const data = new FormData();
  const sign = await getSignature(); // Get returned sign and timestamp

  for (let i = 0; i < images.length; i++) {
    let image = images[i];

    if (sign) {
      const { signature, timestamp } = sign;
      data.append("file", image);
      data.append("signature", signature); // Signature
      data.append("timestamp", timestamp); // Timestamp
      data.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY as string);

      await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => urls.push(data.secure_url))
        .catch((err: Error) => console.error(err.message));
    } else {
      return urls;
    }
  }
  return urls;
};

export const uploadVideo = async (video: string | File) => {
  let url = "";
  const data = new FormData();
  const sign = await getSignature(); // Get returned sign and timestamp
  const file = await fetch(video as string)
    .then((r) => r.blob())
    .then(
      (blobFile) => new File([blobFile], "videoFile", { type: "video/mp4" })
    );

  if (sign) {
    const { signature, timestamp } = sign;
    data.append("file", file);
    data.append("signature", signature); // Signature
    data.append("timestamp", timestamp); // Timestamp
    data.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY as string);

    await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload`,
      {
        method: "POST",
        body: data,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => (url = data.secure_url))
      .catch((err: Error) => console.log(err.message));
  } else {
    return url;
  }

  return url;
};

export const getSignature = async () => {
  //Call API which handles the signature and timestamp
  const response = await fetch("/api/secure/signMedia")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const { signature, timestamp } = data;
      return { signature, timestamp };
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
  return response;
};
