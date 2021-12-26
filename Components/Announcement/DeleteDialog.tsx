import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { useSWRConfig } from "swr";
import deleteAnnouncement from "../../utils/deleteAnnouncement";
import { ErrorContext } from "../ErrorProvider";

// $Inf$ because mutate() works directly with the Cache map built-in. This is the URL in which the getAnnouncements infinite list is in.
const ANNOUNCEMENTS_CACHE =
  "$inf$/api/public/announcements/getAnnouncements?type=normal&limit=10";
const APPLY_ANNOUNCEMENTS_CACHE =
  "$inf$/api/public/announcements/getAnnouncements?type=apply&limit=10";

type DialogProps = {
  handleClose: () => void;
  open: boolean;
};

const DeleteDialog = ({ handleClose, open }: DialogProps) => {
  const handleError = useContext(ErrorContext);
  const router = useRouter();
  const { cache } = useSWRConfig();
  const handleDelete = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL as string}/api/secure/announcements/${
        router.query.id
      }/delete`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("An Error Occurred.");
        }
        return response.json();
      })
      .then((data) => {
        handleClose();
        deleteAnnouncement({
          cacheURL:
            data.type == "Apply Announcement"
              ? APPLY_ANNOUNCEMENTS_CACHE
              : ANNOUNCEMENTS_CACHE,
          announcementID: router.query.id as string,
          cache: cache,
        });
        router.push(`/`);
      })
      .catch((err: Error) => handleError(err.message));
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
