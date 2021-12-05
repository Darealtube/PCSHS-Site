import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { mutate, useSWRConfig } from "swr";
import { CardAnnouncement } from "../../types/PrismaTypes";

const ANNOUNCEMENTS_CACHE = "$inf$/api/announcement/getAnnouncements?limit=2";

type DialogProps = {
  handleClose: () => void;
  handleError: (errorMessage: string) => void;
  open: boolean;
};

const DeleteDialog = ({ handleClose, handleError, open }: DialogProps) => {
  const router = useRouter();
  const { cache } = useSWRConfig();
  const handleDelete = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL as string}/api/announcement/${
        router.query.id
      }/delete`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          handleClose();
          const announceCache = cache.get(ANNOUNCEMENTS_CACHE);

          if (announceCache) {
            mutate(
              ANNOUNCEMENTS_CACHE,
              async (announcement: CardAnnouncement[][]) => {
                const modArray = announcement.find((announcement) =>
                  announcement
                    .map((a) => a.id)
                    .includes(router.query.id as string)
                );
                const modIndex = announcement.findIndex((a) => a === modArray);
                const newData = modArray?.filter(
                  (announcement) => announcement.id != router.query.id
                );
                announcement[modIndex] = newData as CardAnnouncement[];

                return announcement;
              },
              false
            );
          }

          router.push(`/`);
        }
      })
      .catch((error: Error) => handleError(error.message));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete this announcement?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this announcement?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleDelete} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
