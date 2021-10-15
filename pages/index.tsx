import type { GetStaticProps, GetStaticPropsResult } from "next";
import Head from "next/head";
import Announcements from "../Components/Announcements";
import prisma from "../lib/prisma";
import { Announcement } from "../types/PrismaTypes";

type Props = {
  announcements: Announcement[];
};

const Home = ({ announcements }: Props) => {
  return (
    <>
      <Head>
        <title>PCSHS Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Announcements announcements={announcements} />
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
      header: true,
      body: true,
      footer: true,
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
        date: "desc",
      },
    ],
  });
  const realAnnouncements = announcements.map((announcement) => ({
    ...announcement,
    date: JSON.stringify(announcement.date),
  }));
  return { props: { announcements: realAnnouncements } };
};
