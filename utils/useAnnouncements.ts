import { flatten } from "lodash";
import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import { CardAnnouncement } from "../types/PrismaTypes";

const getKey = (
  pageIndex: number,
  previousPageData: CardAnnouncement[] | null
) => {
  const lastCursor = previousPageData?.[previousPageData.length - 1].id;
  // reached the end
  if (previousPageData && !previousPageData.length) {
    return null;
  }

  if (pageIndex === 0) {
    return `/api/announcement/getAnnouncements?limit=2`;
  }

  // add the cursor to the API endpoint
  // EXECUTED IN moreAnnouncement
  return `/api/announcement/getAnnouncements?cursor=${lastCursor}&limit=2`;
};

const useAnnouncements = (
  limit: number,
  initialData?: CardAnnouncement[][]
) => {
  const { data, size, setSize, error, mutate } = useSWRInfinite(getKey, {
    fallbackData: initialData,
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });
  const announcements = useMemo(
    () => flatten(data ? [...[], ...data] : []),
    [data]
  );
  const isEmpty = data?.[0]?.length === 0;
  const noMore = isEmpty || (data && data[data.length - 1]?.length < limit);
  const moreAnnouncements = () => {
    setSize(size + 1);
  };

  const mutateAnnouncements = (newData: CardAnnouncement) => {
    mutate([...(data as CardAnnouncement[][]), ...[[newData]]]);
  };

  return {
    announcements,
    error,
    isEmpty,
    noMore,
    moreAnnouncements,
    mutateAnnouncements,
  };
};

export default useAnnouncements;
