import { mutate, Cache as SWRCache } from "swr";
import { CardAnnouncement } from "../types/PrismaTypes";

// Works both for deleting application announcements and school/SSG announcements.

type DeleteAnnouncementProps = {
  cacheURL: string;
  announcementID: string;
  cache: SWRCache<any>;
};

const deleteAnnouncement = ({
  cacheURL,
  announcementID,
  cache,
}: DeleteAnnouncementProps) => {
  const announceCache = cache.get(cacheURL);
  if (announceCache) {
    mutate(
      cacheURL,
      async (announcement: CardAnnouncement[][]) => {
        // Finds the "page" or the array that contains the modification.
        const modArray = announcement.find((announcement) =>
          announcement.map((a) => a.id).includes(announcementID)
        );
        // Finds the index of the said array in the pages (array) array.
        const modIndex = announcement.findIndex((a) => a === modArray);
        // Filters the modified page
        const newData = modArray?.filter(
          (announcement) => announcement.id != announcementID
        );
        // The index of the outdated page is now replaced with the modified page.
        announcement[modIndex] = newData as CardAnnouncement[];
        
        return announcement;
      },
      false
    );
  }
};

export default deleteAnnouncement;
