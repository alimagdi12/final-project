/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from "react";
import "./Auth.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate =useNavigate()
  const handleSignUp = async () => {
    console.log(signUpForm);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        signUpForm
      );
      console.log(response.data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const { setToken } = useContext(UserContext);
  const handleSignIn = async () => {
    console.log(signInForm);
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        signInForm
      );
      console.log(response.data.user.token);
      setToken(response.data.user.token);
      localStorage.setItem("token", response.data.user.token);
      navigate('/home')
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const [isSwitched, setIsSwitched] = useState(false);
  const [signUpForm, setsignUpForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDay: "",
    phoneNumber:"",
    password: "",
    confirmPassword: "",
  });
  const [signInForm, setsignInForm] = useState({
    email: "",
    password: "",
  });
  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target;
    setsignUpForm({
      ...signUpForm,
      [name]: value,
    });
  };

  const handleSignInInputChange = (e) => {
    const { name, value } = e.target;
    setsignInForm({
      ...signInForm,
      [name]: value,
    });
  };

  const [moveToRegister, setmoveToRegister] = useState(false);
  const [moveToLogin, setMoveToLogin] = useState(true);
  const [moveToOtp, setMoveToOtp] = useState(false);
  const [moveToforget, setMoveToForget] = useState(false);
  const [moveToReset, setMoveToReset] = useState(false);
  const [fade, setFade] = useState(false);

  const handleToLogin = () => {
    setFade(true);

    setMoveToLogin(true);
    setmoveToRegister(false);
    setMoveToForget(false);
    setMoveToOtp(false);
    setMoveToReset(false);

    setTimeout(() => {
      setMoveToLogin(true);
    }, 200);

    setTimeout(() => {
      setFade(false);
    }, 500);
  };

  const handleToRegister = () => {
    setFade(true);

    setTimeout(() => {
      setMoveToLogin(false);
      setmoveToRegister(true);
      setMoveToForget(false);
      setMoveToOtp(false);
      setMoveToReset(false);
    }, 200);

    setTimeout(() => {
      setFade(false);
    }, 500);
  };

  const handleToForget = () => {
    setFade(true);
    setTimeout(() => {
      setMoveToLogin(false);
      setmoveToRegister(false);
      setMoveToForget(true);
      setMoveToOtp(false);
      setMoveToReset(false);
    }, 200);
    setTimeout(() => {
      setFade(false);
    }, 300);
  };

  const handleToOtp = () => {
    setFade(true);
    setTimeout(() => {
      setMoveToLogin(false);
      setmoveToRegister(false);
      setMoveToForget(false);
      setMoveToOtp(true);
      setMoveToReset(false);
    }, 200);
    setTimeout(() => {
      setFade(false);
    }, 300);
  };

  const handleToReset = () => {
    setFade(true);
    setTimeout(() => {
      setMoveToLogin(false);
      setmoveToRegister(false);
      setMoveToForget(false);
      setMoveToOtp(false);
      setMoveToReset(true);
    }, 200);
    setTimeout(() => {
      setFade(false);
    }, 300);
  };

  return (
    <Box className="container d-flex align-items-center text-center">
      <Box
        className={`clipped-element ${moveToRegister ? "move-bottom" : ""}`}
      ></Box>

      {/* registeration Box */}
      <Grid
  container
  className={`inputs  ${moveToRegister ? "d-block" : "d-none"} ${
    fade ? "fade-out" : "fade-in"
  }`}
  justifyContent="center"
  alignItems="center"
  sx={{ width: "75%", margin: "auto" }}
>
  <Typography variant="h5" margin={1}>
    Vibe Verse
  </Typography>
  <Typography variant="h5" margin={1}>
    Create your account
  </Typography>
  
  
  
  <Grid display={'flex'} sx={{display:'flex' , flexWrap:'wrap',justifyContent:'space-between'}} xs={12 } md={12}>


  
  <Grid item xs={12} md={5} margin={1}>
    <TextField
      sx={{
        width: "100%",
        marginBottom: "16px",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
        "& .MuiInput-underline:after": {
          borderBottomColor: "rgb(150, 187, 124)",
          color: "rgb(150, 187, 124)",
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "rgb(150, 187, 124)",
          },
        },
      }}
      InputLabelProps={{ style: { color: "#79987a" } }}
      label="First Name"
      name="firstName"
      value={signUpForm.firstName}
      onChange={handleSignUpInputChange}
    />
  </Grid>
  <Grid item xs={12} md={5} margin={1}>
    <TextField
      sx={{
        width: "100%",
        marginBottom: "16px",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
        "& .MuiInput-underline:after": {
          borderBottomColor: "rgb(150, 187, 124)",
          color: "rgb(150, 187, 124)",
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "rgb(150, 187, 124)",
          },
        },
      }}
      InputLabelProps={{ style: { color: "#79987a" } }}
      label="Last Name"
      name="lastName"
      value={signUpForm.lastName}
      onChange={handleSignUpInputChange}
    />
  </Grid>
  </Grid>


  <Grid item xs={12} margin={1}>
    <TextField
      sx={{
        width: "100%",
        marginBottom: "16px",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
        "& .MuiInput-underline:after": {
          borderBottomColor: "rgb(150, 187, 124)",
          color: "rgb(150, 187, 124)",
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "rgb(150, 187, 124)",
          },
        },
      }}
      InputLabelProps={{ style: { color: "#79987a" } }}
      label="Email"
      name="email"
      value={signUpForm.email}
      onChange={handleSignUpInputChange}
    />
  </Grid>
  <Grid item xs={12} margin={1}>
    <TextField
      sx={{
        width: "100%",
        marginBottom: "16px",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
      }}
      label="Phone Number"
      name="phoneNumber"
      value={signUpForm.phoneNumber}
      onChange={handleSignUpInputChange}
    />
  </Grid>
  <Grid item xs={12} margin={1}>
    <TextField
      sx={{
        width: "100%",
        marginBottom: "16px",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
      }}
      label="Password"
      name="password"
      type="password"
      value={signUpForm.password}
      onChange={handleSignUpInputChange}
    />
  </Grid>
  <Grid item xs={12} margin={1}>
    <TextField
      sx={{
        width: "100%",
        marginBottom: "16px",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
      }}
      label="Confirm Password"
      name="confirmPassword"
      type="password"
      value={signUpForm.confirmPassword}
      onChange={handleSignUpInputChange}
    />
  </Grid>
  <Grid item xs={12} margin={1}>
    <TextField
      sx={{
        width: "100%",
        marginBottom: "16px",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
      }}
      label="Birthday"
      name="birthDay"
      type="date"
      value={signUpForm.birthDay}
      onChange={handleSignUpInputChange}
      InputLabelProps={{
        shrink: true,
        style: { color: "#79987a" },
      }}
    />
  </Grid>
  <Grid item xs={12} margin={1}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#76a85f",
        "&:hover": {
          backgroundColor: "#fff",
          color: "#76a85f",
          outline: "2px solid #76a85f",
        },
      }}
      onClick={handleSignUp}
    >
      Register
    </Button>
  </Grid>
  <Grid item xs={12} margin={2}>
    <Typography
      sx={{ display: "flex", justifyContent: "center" }}
      margin={2}
    >
      {" "}
      Have an account?{" "}
      <Typography
        marginX={1}
        sx={{
          color: "#76a85f",
          "&:hover": { cursor: "pointer", textDecoration: "underline" },
        }}
        onClick={handleToLogin}
      >
        Login{" "}
      </Typography>{" "}
    </Typography>
  </Grid>
  <Grid item xs={12} md={6} margin={1}>
    <img src="bro.png" className="regImg" alt="" />
  </Grid>
</Grid>


      {/* Login Box */}
      <Box
        className={`inputs  ${moveToLogin ? "d-block" : "d-none"} ${
          fade ? "fade-out" : "fade-in"
        }`}
        sx={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          width: "75%",
          margin: "auto",
        }}
      >
        <Typography variant="h5">Vibe Verse</Typography>
        <Typography variant="h5">Welcome Back!</Typography>
        <Box margin={1}>
          <TextField
            sx={{
              width: "100%",
              marginBottom: "16px",
              backgroundColor: "rgba(0, 255, 0, 0.1)",
            }}
            label="Email"
            name="email"
            value={signInForm.email}
            onChange={handleSignInInputChange}
          />
          <TextField
            sx={{
              width: "100%",
              marginBottom: "16px",
              backgroundColor: "rgba(0, 255, 0, 0.1)",
            }}
            label="password"
            name="password"
            value={signInForm.password}
            onChange={handleSignInInputChange}
          />
          <Typography
            sx={{ color: "#76a85f", textAlign: "end" }}
            onClick={handleToForget}
          >
            forget Password?{" "}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#76a85f",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#76a85f",
              outline: "2px solid #76a85f",
            },
          }}
          onClick={handleSignIn}
        >
          login
        </Button>
        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          margin={2}
        >
          {" "}
          Don't have an account?{" "}
          <Typography
            marginX={1}
            sx={{
              color: "#76a85f",
              "&:hover": { cursor: "pointer", textDecoration: "underline" },
            }}
            onClick={handleToRegister}
          >
            {" "}
            Register{" "}
          </Typography>{" "}
        </Typography>
        <img src="bro1.png" className="logImg" alt="" />
      </Box>

      {/* forget password Box  */}
      <Box
        className={`inputs  ${moveToforget ? "d-block" : "d-none"}  ${
          fade ? "fade-out" : "fade-in"
        }`}
        sx={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          width: "75%",
          margin: "auto",
        }}
      >
        <Typography variant="h5" margin={1}>
          Vibe Verse
        </Typography>
        <Typography variant="h5" margin={1}>
          Forget Password?
        </Typography>
        <Box margin={1}>
          <TextField
            sx={{
              width: "100%",
              marginBottom: "16px",
              backgroundColor: "rgba(0, 255, 0, 0.1)",
            }}
            label="password"
            name="password"
            value={signInForm.password}
            onChange={handleSignUpInputChange}
          />
          <Typography
            sx={{
              color: "#76a85f",
              textAlign: "end",
              display: "flex",
              justifyContent: "flex-start",
            }}
            onClick={handleToLogin}
          >
            Back to login?{" "}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#76a85f",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#76a85f",
              outline: "2px solid #76a85f",
            },
          }}
          onClick={handleToOtp}
        >
          Send
        </Button>
      </Box>

      {/* Check OTP  */}
      <Box
        className={`inputs  ${moveToOtp ? "d-block" : "d-none"}  ${
          fade ? "fade-out" : "fade-in"
        }`}
        sx={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          width: "75%",
          margin: "auto",
        }}
      >
        <Typography variant="h5" margin={1}>
          Vibe Verse
        </Typography>
        <Typography variant="h5" margin={1}>
          Reset Password
        </Typography>
        <Box margin={1}>
          <TextField
            sx={{
              width: "100%",
              marginBottom: "16px",
              backgroundColor: "rgba(0, 255, 0, 0.1)",
            }}
            label="password"
            name="password"
            value={signInForm.password}
            onChange={handleSignUpInputChange}
          />
          <Typography
            sx={{
              color: "#76a85f",
              textAlign: "end",
              display: "flex",
              justifyContent: "flex-start",
            }}
            onClick={handleToForget}
          >
            Back{" "}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#76a85f",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#76a85f",
              outline: "2px solid #76a85f",
            },
          }}
          onClick={handleToReset}
        >
          Verify
        </Button>
      </Box>

      {/* Check Reset  */}
      <Box
        className={`inputs  ${moveToReset ? "d-block" : "d-none"}  ${
          fade ? "fade-out" : "fade-in"
        }`}
        sx={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          width: "75%",
          margin: "auto",
        }}
      >
        <Typography variant="h5" margin={1}>
          Vibe Verse
        </Typography>
        <Typography variant="h5" margin={1}>
          Reset Password
        </Typography>
        <Box margin={1}>
          <TextField
            sx={{
              width: "100%",
              marginBottom: "16px",
              backgroundColor: "rgba(0, 255, 0, 0.1)",
            }}
            label="password"
            name="password"
            value={signInForm.password}
            onChange={handleSignUpInputChange}
          />
          <TextField
            sx={{
              width: "100%",
              marginBottom: "16px",
              backgroundColor: "rgba(0, 255, 0, 0.1)",
            }}
            label="password"
            name="password"
            value={signInForm.password}
            onChange={handleSignUpInputChange}
          />
          <Typography
            sx={{
              color: "#76a85f",
              textAlign: "end",
              display: "flex",
              justifyContent: "flex-start",
            }}
            onClick={handleToForget}
          >
            Back{" "}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#76a85f",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#76a85f",
              outline: "2px solid #76a85f",
            },
          }}
          onClick={handleToLogin}
        >
          Go to Login
        </Button>
      </Box>
    </Box>
  );
}