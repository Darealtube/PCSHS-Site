/* 
 useArt handles the art load when you upload a file while creating a post,
 when changing your backdrop or avatar, and anything that requires changing
 an image. What it does is to first set loading to true, and while it's true,
 it calls upon the Cloudinary API in order to make a POST request that will
 submit the image and place it there. Then, setArt will get the post data that
 is returned by Cloudinary, namely the secure_url, the width, and the height of
 the image. Then the FileReader will load a temporary image to be loaded client side,
 and it will return the url, the width, and the height of the image. useArt returns
 the setArt function, the loading state, and the placeholder (returned by FileReader). 
 */

const uploadImage = async (image: File | string) => {
  let url: string | undefined;
  const data = new FormData();
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
  url = await file.secure_url;
  return url;
};

const getSignature = async () => {
  //Call API which handles the signature and timestamp
  const response = await fetch("/api/signimage");
  //Get the response in JSON format
  const data = await response.json();
  //Extract signature and timestamp
  const { signature, timestamp } = data;
  return { signature, timestamp };
};

export default uploadImage;
