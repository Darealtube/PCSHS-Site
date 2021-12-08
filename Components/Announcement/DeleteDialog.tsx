import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useSWRConfig } from "swr";
import deleteAnnouncement from "../../utils/deleteAnnouncement";

// $Inf$ because mutate() works directly with the Cache map built-in. This is the URL in which the getAnnouncements infinite list is in.
const ANNOUNCEMENTS_CACHE =
  "$inf$/api/announcement/getAnnouncements?type=normal&limit=10";
const APPLY_ANNOUNCEMENTS_CACHE =
  "$inf$/api/announcement/getAnnouncements?type=apply&limit=10";

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
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          const res = await response.json();
          handleClose();
          deleteAnnouncement({
            cacheURL:
              res.type == "Apply Announcement"
                ? APPLY_ANNOUNCEMENTS_CACHE
                : ANNOUNCEMENTS_CACHE,
            announcementID: router.query.id as string,
            cache: cache,
          });
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
