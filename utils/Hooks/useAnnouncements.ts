import { flatten } from "lodash";
import useSWRInfinite from "swr/infinite";
import { CardAnnouncement } from "../../types/PrismaTypes";

type useAnnouncementProps = {
  limit: number;
  type: string;
  initialData?: CardAnnouncement[][];
};

const useAnnouncements = ({
  limit,
  type,
  initialData,
}: useAnnouncementProps) => {
  const { data, size, setSize, error, mutate } = useSWRInfinite(
    (pageIndex: number, previousPageData: CardAnnouncement[] | null) => {
      const lastCursor = previousPageData?.[previousPageData.length - 1].id;
      // reached the end
      if (previousPageData && !previousPageData.length) {
        return null;
      }

      if (pageIndex === 0) {
        return `/api/announcement/getAnnouncements?type=${type}&limit=${limit}`;
      }

      // add the cursor to the API endpoint
      // EXECUTED IN moreAnnouncement
      return `/api/announcement/getAnnouncements?type=${type}&cursor=${lastCursor}&limit=${limit}`;
    },
    {
      fallbackData: initialData,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  );

  const announcements = flatten(data ? [...[], ...data] : []);
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
