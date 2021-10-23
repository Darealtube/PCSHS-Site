export const getPFP = (
  files: FileList,
  onResult: (result: string | null, error?: string) => any
) => {
  const file = files[0];
  var image = new Image();
  var height: number, width: number;
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    image.src = e.target?.result as string;

    image.onload = () => {
      height = image.height;
      width = image.width;
      if (height && width != 288) {
        onResult(null, "Please insert a 288 x 288 image.");
      } else {
        onResult(reader.result as string | null);
      }
    };
  };
};
