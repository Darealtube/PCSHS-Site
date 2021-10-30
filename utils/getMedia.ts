export const getImages = (files: FileList, fn: (result: string[]) => void) => {
  var images: string[] = [];
  for (let i = 0; i < files.length; i++) {
    var file = files[i];
    var reader = new FileReader();
    reader.onload = function (e) {
      images.push(e.target?.result as string);
      fn(images);
    };
    reader.readAsDataURL(file);
  }
};

export const getVideo = (file: File, fn: (result: string) => void) => {
  var reader = new FileReader();
  var video = "";
  reader.onload = function (e) {
    const buffer = new Int8Array(e.target?.result as ArrayBuffer);
    const blob = new Blob([buffer], { type: "video/mp4" });
    video = URL.createObjectURL(blob) as string;
    fn(video);
  };
  reader.readAsArrayBuffer(file);
};
