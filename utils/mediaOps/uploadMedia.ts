export const uploadImages = async (images: FileList | string[]) => {
  let urls: string[] = [];
  const data = new FormData();

  for (let i = 0; i < images.length; i++) {
    let image = images[i];
    const sign = await getSignature(); // Get returned sign and timestamp

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
        .then((data) => {
          urls.push(data.secure_url);
        })
        .catch((err) => console.log(err));
    } else {
      return urls;
    }
  }
  return urls;
};

export const uploadVideo = async (video: string | File) => {
  let url: string = "";
  const data = new FormData();

  const sign = await getSignature(); // Get returned sign and timestamp

  if (sign) {
    const { signature, timestamp } = sign;
    data.append("file", video);
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
      .then((data) => {
        url = data.secure_url;
      })
      .catch((err) => console.log(err));
  } else {
    return url;
  }

  return url;
};

const getSignature = async () => {
  //Call API which handles the signature and timestamp
  const response = await fetch("/api/signMedia")
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
      console.log(err);
      return null;
    });
  return response;
};
