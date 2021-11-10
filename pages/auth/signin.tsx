import { Container, Paper, TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { signIn } from "next-auth/client";
import PCSHSLogo from "../../public/pcshslogo.png";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/SignIn.module.css";
import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";

const DynamicError = dynamic(() => import("../../Components/ErrorSnack"));

const SignIn = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [credentials, setCredentials] = useState({
    lrn: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    open: false,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSignIn = () => {
    setDisabled(true);
    signIn("credentials", {
      ...credentials,
      type: "Sign In",
      callbackUrl: "/",
      redirect: false,
    }).then((values) => {
      if (values?.error) {
        setError({
          open: true,
          message: values.error,
        });
        setDisabled(false);
      } else {
        router.replace(values?.url as string);
      }
    });
  };

  const handleSignUp = () => {
    setDisabled(true);
    signIn("credentials", {
      ...credentials,
      type: "Sign Up",
      callbackUrl: "/",
      redirect: false,
    }).then((values) => {
      if (values?.error) {
        setError({
          open: true,
          message: values.error,
        });
        setDisabled(false);
      } else {
        router.replace(values?.url as string);
      }
    });
  };

  const handleErrorClose = () => {
    setError({
      ...error,
      open: false,
    });
  };

  return (
    <>
      <Head>
        <title>PCSHS Sign In</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={styles.signInContainer}>
        <Paper variant="outlined" className={styles.signInPaper}>
          <Container className={styles.paperContainer}>
            <Box className={styles.logoBox}>
              <Image
                src={PCSHSLogo}
                alt="PCSHS Logo"
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                className={styles.logo}
              />
            </Box>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ marginBottom: "32px" }}
            >
              Sign In to Pasig City Science Highschool
            </Typography>
            <TextField
              id="lrn"
              label="Learner's Reference Number"
              variant="outlined"
              name="lrn"
              value={credentials.lrn}
              sx={{ marginBottom: "16px" }}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              name="username"
              type="text"
              value={credentials.username}
              sx={{ marginBottom: "16px" }}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={credentials.password}
              sx={{ marginBottom: "48px" }}
              fullWidth
              onChange={handleChange}
            />

            <Button
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "16px" }}
              onClick={handleSignIn}
              disabled={
                disabled || !credentials.username || !credentials.password
              }
            >
              Log In
            </Button>
            <Button
              variant="outlined"
              onClick={handleSignUp}
              fullWidth
              sx={{ marginBottom: "16px" }}
              disabled={
                disabled || !credentials.username || !credentials.password
              }
            >
              Sign Up
            </Button>
          </Container>
        </Paper>
      </Box>
      <DynamicError
        open={error.open}
        handleClose={handleErrorClose}
        error={error.message}
      />
    </>
  );
};

export default SignIn;