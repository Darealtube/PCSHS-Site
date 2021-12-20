import { useState } from "react";

const usePreview = () => {
  const [preview, setPreview] = useState({
    open: false,
    index: -1,
  });

  const closePrev = () => {
    setPreview({
      open: false,
      index: -1,
    });
  };

  const openPrev = (index: number) => {
    setPreview({
      open: true,
      index: index,
    });
  };

  const switchPrev = (action: "next" | "prev") => {
    if (action == "next") setPreview({ ...preview, index: preview.index + 1 });
    if (action == "prev") setPreview({ ...preview, index: preview.index - 1 });
  };

  return { preview, closePrev, openPrev, switchPrev };
};

export default usePreview;
