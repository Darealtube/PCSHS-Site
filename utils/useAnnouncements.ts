import { flatten } from "lodash";
import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import { CardAnnouncement } from "../types/PrismaTypes";

const getKey = (
  pageIndex: number,
  previousPageData: CardAnnouncement[] | null
) => {
  // reached the end
  if (previousPageData && !previousPageData) return null;
  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/api/announcement/getAnnouncements?limit=1`;

  // add the cursor to the API endpoint
  return `/api/announcement/getAnnouncements?cursor=${
    previousPageData?.[previousPageData.length - 1].id
  }&limit=1`;
};

const useAnnouncements = (
  limit: number,
  initialData?: CardAnnouncement[][]
) => {
  const { data, size, setSize, error, mutate } = useSWRInfinite(getKey, {
    fallbackData: initialData,
    revalidateOnFocus: false,
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
