import { GetServerSideProps, GetStaticPropsResult } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import prisma from "../../lib/prisma";
import Head from "next/head";
import StudentProfile from "../../Components/Profile/Profiles/StudentProfile";
import GovernmentProfile from "../../Components/Profile/Profiles/GovernmentProfile";
import VisitorProfile from "../../Components/Profile/Profiles/VisitorProfile";

type ProfileType = {
  name: string;
  image: string | null;
  age: string | null;
  current_grade: string | null;
  current_section: string | null;
  date_of_birth: Date | null;
  lrn: string | null;
  sex: string | null;
  address: string | null;
  contact: string | null;
  email: string | null;
  members: string[];
  role: string;
} | null;

type ProfileProps = {
  session: Session | null;
  profile: ProfileType;
};

const Profile = ({ profile }: ProfileProps) => {
  return (
    <>
      <Head>
        <title>PCSHS Student Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {profile?.role == "Student" ? (
        <StudentProfile student={profile} />
      ) : profile?.role == "Government" ? (
        <GovernmentProfile government={profile} />
      ) : (
        <VisitorProfile visitor={profile} />
      )}
    </>
  );
};

export default Profile;

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
        age: true,
        current_grade: true,
        current_section: true,
        date_of_birth: true,
        lrn: true,
        sex: true,
        image: true,
        address: true,
        contact: true,
        email: true,
        members: true,
        role: true,
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
