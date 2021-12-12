import { GetServerSideProps, GetStaticPropsResult } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import Head from "next/head";
import { Profile } from "../../types/PrismaTypes";
import { useContext, useReducer, useState } from "react";
import profileReducer from "../../utils/Reducers/profileReducer";
import { useRouter } from "next/dist/client/router";
import { uploadImages } from "../../utils/mediaOps/uploadMedia";
import EditIDFront from "../../Components/Profile/Edit Profiles/EditIDFront";
import EditIDBack from "../../Components/Profile/Edit Profiles/EditIDBack";
import { Button } from "@mui/material";
import styles from "../../styles/Profile.module.css";
import { Box } from "@mui/system";
import FlipIcon from "@mui/icons-material/Flip";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";
import { isEqual } from "lodash";
import { ErrorContext } from "../../Components/ErrorProvider";

type ProfileProps = {
  session: Session | null;
  profile: Profile;
};

const EditProfile = ({ profile }: { profile: Profile }) => {
  const handleError = useContext(ErrorContext);
  const initState = {
    name: profile?.name || "",
    lrn: profile?.lrn || "",
    image: profile?.image || "/user-empty-avatar.png",
    current_grade: profile?.current_grade || "",
    current_section: profile?.current_section || "",
    date_of_birth: profile?.date_of_birth || null,
    email: profile?.email || "",
    sex: profile?.sex || "",
    contact: profile?.contact || "",
    address: profile?.address || "",
    about: profile?.about || "",
  };
  const router = useRouter();
  const [flipped, setFlipped] = useState(false);
  const [prof, dispatch] = useReducer(profileReducer, initState);
  const sameInfo = isEqual(prof, initState);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL as string}/api/updateProfile`,
      {
        method: "POST",
        body: JSON.stringify({
          ...prof,
          image: await uploadImages([prof.image]).then((urls) => urls[0]),
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          router.replace("/profile/");
        }
      })
      .catch((err: Error) => handleError(err.message));
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <>
      <Head>
        <title>PCSHS Edit Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Button
        startIcon={<FlipIcon />}
        onClick={handleFlip}
        sx={{ position: "relative", bottom: "10px", mr: 2 }}
        variant="outlined"
      >
        Flip
      </Button>

      <Link passHref href="/profile">
        <Button
          component="a"
          startIcon={<CancelIcon />}
          sx={{ position: "relative", bottom: "10px", mr: 2 }}
          variant="outlined"
        >
          Cancel
        </Button>
      </Link>

      <Button
        startIcon={<EditIcon />}
        onClick={handleSubmit}
        sx={{ position: "relative", bottom: "10px", mr: 2 }}
        variant="outlined"
        disabled={sameInfo}
      >
        Submit
      </Button>

      <Box
        className={flipped ? styles.idContainerFlipped : styles.idContainer}
        style={{ height: "100%", marginBottom: "250px" }}
      >
        {!flipped && <EditIDFront profile={prof} dispatch={dispatch} />}
        <EditIDBack profile={prof} dispatch={dispatch} />
      </Box>

      <Box height="40px" />
    </>
  );
};

export default EditProfile;

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<GetStaticPropsResult<ProfileProps>> => {
  const session = await getSession(context);
  if (session) {
    const profile = await prisma.profile.findUnique({
      where: {
        name: (session?.user as Session).name as string | undefined,
      },
      select: {
        name: true,
        current_grade: true,
        current_section: true,
        date_of_birth: true,
        lrn: true,
        sex: true,
        image: true,
        address: true,
        contact: true,
        email: true,
        role: true,
        about: true,
      },
    });

    return {
      props: {
        session: session,
        profile,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
};
