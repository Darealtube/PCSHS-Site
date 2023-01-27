import { Box, List, Skeleton, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CardAnnouncement } from "../../../types/PrismaTypes";
import EmptyAvatar from "../../../public/user-empty-avatar.png";

const CardSkeleton = () => {
  return (
    <>
      <ListItem divider>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Skeleton variant="rectangular" style={{ marginBottom: "8px" }} />
          }
          secondary={<Skeleton variant="rectangular" width="80%" />}
        />
      </ListItem>
    </>
  );
};

type ListProps = {
  announcements: CardAnnouncement[];
  moreAnnouncements: () => void;
  noMore: boolean | undefined;
};

const AnnouncementList = ({
  announcements,
  moreAnnouncements,
  noMore,
}: ListProps) => {
  return (
    <InfiniteScroll
      next={moreAnnouncements}
      dataLength={announcements.length}
      loader={<CardSkeleton />}
      hasMore={!noMore}
      scrollableTarget={"drawerScrollable"}
      scrollThreshold={0.9}
    >
      <List>
        {announcements &&
          announcements.map((announcement) => (
            <React.Fragment key={announcement.id}>
              <ListItem divider sx={{ backdropFilter: "blur(20px)" }}>
                <ListItemAvatar>
                  <Image
                    src={announcement.author?.image ?? EmptyAvatar}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                    alt="AnnouncementAvatar"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography>
                      {announcement.author?.name ?? "Deleted User"}
                    </Typography>
                  }
                  secondary={announcement.header}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "clip",
                  }}
                />
              </ListItem>
            </React.Fragment>
          ))}
      </List>
    </InfiniteScroll>
  );
};

export default AnnouncementList;
