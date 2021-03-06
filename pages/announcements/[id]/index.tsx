import { GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import useSWR from "swr";
import prisma from "../../../lib/prisma";
import { Announcement } from "../../../types/PrismaTypes";
import Image from "next/image";
import { Grid, Box, Typography, Divider, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useState } from "react";
import Markdown from "react-markdown";
import remarkGFM from "remark-gfm";
import Link from "next/link";
import Fallback from "../../../Components/Announcement/Fallback";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import usePreview from "../../../utils/Hooks/usePreview";
import styles from "../../../styles/Announcement.module.css";

const DynamicDeleteDialog = dynamic(
  () => import("../../../Components/Announcement/DeleteDialog")
);
const DynamicPreview = dynamic(
  () => import("../../../Components/ImagePreview")
);

type InitialProps = {
  announcement: Announcement;
  id: string;
};

const AnnouncementID = ({ announcement, id }: InitialProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data } = useSWR(`/api/public/announcements/${id}/`, {
    fallbackData: announcement,
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { preview, closePrev, openPrev, switchPrev } = usePreview();
  const handleDelete = () => {
    setDeleteOpen(!deleteOpen);
  };

  if (router.isFallback) {
    return <Fallback />;
  }

  return (
    <>
      <Head>
        <title>PCSHS Announcement</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={styles.mediaContainer}>
        {(data?.image?.length != 0 || !!data?.video) && (
          <Grid container sx={{ height: "100%" }} spacing={1}>
            {data?.image &&
              data?.image.map((image, index) => (
                <React.Fragment key={image}>
                  <Grid item xs={(data.image as string[]).length > 1 ? 6 : 12}>
                    <Box
                      className={styles.imageContainer}
                      onClick={() => openPrev(index)}
                    >
                      <Image
                        src={image}
                        layout="fill"
                        objectFit="cover"
                        alt="Announcement Image"
                      />
                    </Box>
                  </Grid>
                </React.Fragment>
              ))}
            {data?.video && (
              <video src={data?.video} width="100%" height="100%" controls />
            )}
          </Grid>
        )}
      </Box>

      <Box display="flex">
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }} gutterBottom>
          Published by {data?.author?.name} on {data?.date}
        </Typography>

        {session?.role == "Government" && (
          <>
            <Link href={`/announcements/${id}/edit`} passHref>
              <IconButton component="a">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon />
            </IconButton>{" "}
          </>
        )}
      </Box>

      <Typography variant="h4">
        <Markdown plugins={[remarkGFM]}>{data?.header ?? ""}</Markdown>
      </Typography>

      <Typography variant="h6">
        <Markdown plugins={[remarkGFM]}>{data?.body ?? ""}</Markdown>
      </Typography>

      <Divider />

      <Typography variant="subtitle1" gutterBottom mb={8}>
        <Markdown plugins={[remarkGFM]}>{data?.footer ?? ""}</Markdown>
      </Typography>

      <Divider />

      <DynamicDeleteDialog handleClose={handleDelete} open={deleteOpen} />
      <DynamicPreview
        preview={preview}
        handleClose={closePrev}
        switchPrev={switchPrev}
        images={data?.image as string[]}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const announcements = await prisma.announcement.findMany({
    select: {
      id: true,
    },
  });

  const paths = announcements.map((announcement) => ({
    params: { id: announcement.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const announcement = await prisma.announcement.findUnique({
    where: {
      id: context.params?.id as string,
    },
    select: {
      id: true,
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
  });

  if (!announcement) {
    return {
      notFound: true,
    };
  }

  return { props: { announcement, id: context.params?.id }, revalidate: 10 };
};

export default AnnouncementID;
