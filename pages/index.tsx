import type { GetStaticProps, GetStaticPropsResult } from "next";
import Head from "next/head";
import prisma from "../lib/prisma";
import { CardAnnouncement } from "../types/PrismaTypes";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import Announcement from "../Components/AnnouncementCard";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useAnnouncements from "../utils/Hooks/useAnnouncements";
import { useTheme } from "@mui/system";

type ListProps = {
  announcements: CardAnnouncement[];
  moreAnnouncements: () => void;
  noMore: boolean | undefined;
};

type Props = {
  initAnnouncements: CardAnnouncement[];
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
      loader={
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom={2}
        >
          <CircularProgress color="inherit" />
        </Box>
      }
      hasMore={!noMore}
      scrollableTarget={"scrollable"}
      scrollThreshold={0.9}
    >
      {announcements &&
        announcements.map((announcement) => (
          <React.Fragment key={announcement.id}>
            <Announcement announcement={announcement} type="SSG" />
          </React.Fragment>
        ))}
    </InfiniteScroll>
  );
};

const Home = ({ initAnnouncements }: Props) => {
  const theme = useTheme();
  const { announcements, moreAnnouncements, noMore } = useAnnouncements({
    limit: 10,
    type: "normal",
    initialData: [[...initAnnouncements]],
  });

  return (
    <>
      <Head>
        <title>PCSHS Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {initAnnouncements && (
        <AnnouncementList
          announcements={announcements}
          noMore={noMore}
          moreAnnouncements={moreAnnouncements}
        />
      )}
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const announcements = await prisma.announcement.findMany({
    where: {
      OR: [{ type: "SSG Announcement" }, { type: "School Announcement" }],
    },
    select: {
      id: true,
      header: true,
      image: true,
      video: true,
      date: true,
      author: {
        select: {
          image: true,
          name: true,
        },
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    take: 10,
  });
  return { props: { initAnnouncements: announcements }, revalidate: 10 };
};
