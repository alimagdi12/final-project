/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from "react";
import "./Auth.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ColorContext from "../contexts/ColorContext";
import { toast } from "react-toastify";
import { lighten, rgba } from 'polished';
export default function Auth() {

// const {user,setUser}= useContext(UserContext)
  const {color} = useContext(ColorContext)
  const navigate =useNavigate()
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        signUpForm
      );
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const { setToken } = useContext(UserContext);
  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        signInForm
      );
      
      // Log the entire response to understand its structure
      console.log('Response:', response);
      
      // Log specific parts of the response
      console.log('Response Data:', response.data);
      console.log('Response Data User:', response.data.user);
      console.log('Response Data User Token:', response.data.user.token);
      
      // Check if token exists before setting it
      if (response.data && response?.data?.user && response?.data?.user?.token) {
        setToken(response.data.user.token);
        localStorage.setItem("token", response.data.user.token);
        toast.success('logged sucessfully')
        navigate('/home');
      } else {
        toast.error('log in failed')
        console.error("Token not found in response:", response);
      }
    } catch (error) {
      console.error("Signin failed:", error);
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
  const colorWithOpacity = lighten(0.2, color);
  const colorLighten = lighten(0.4, color);
  return (
    <Box className="container d-flex align-items-center text-center">
      <Box
        className={`clipped-element ${moveToRegister ? "move-bottom" : ""}`}
      >

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 270">
    <defs>
      <style>
        {`
          .cls-1{fill:${colorWithOpacity};}
          .cls-2{fill:${color};}
        `}
      </style>
    </defs>
    <title>Asset 2</title>
    <g id="Layer_2" data-name="Layer 2">
      <g id="visual">
        <path className="cls-1" d="M0,0C27.9,22.3,55.8,44.5,89.2,54.7s72.2,8.4,101,25.1,47.6,52.1,59.2,86.9,16.1,69,20.6,103.3H0Z"/>
        <path className="cls-2" d="M0,135c13.9,11.1,27.9,22.3,44.6,27.4s36.1,4.1,50.5,12.5,23.8,26,29.6,43.4,8.1,34.6,10.3,51.7H0Z"/>
      </g>
    </g>
  </svg>
        
      </Box>

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
        backgroundColor:colorLighten,
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
      InputLabelProps={{ style: { color: color } }}
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
        backgroundColor:colorLighten,
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
      InputLabelProps={{ style: { color: color } }}
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
        backgroundColor:colorLighten,
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
      InputLabelProps={{ style: { color: color } }}
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
        backgroundColor:colorLighten,
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
        backgroundColor:colorLighten,
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
        backgroundColor:colorLighten,
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
        backgroundColor:colorLighten,
      }}
      label="Birthday"
      name="birthDay"
      type="date"
      value={signUpForm.birthDay}
      onChange={handleSignUpInputChange}
      InputLabelProps={{
        shrink: true,
        style: { color: color },
      }}
    />
  </Grid>
  <Grid item xs={12} margin={1}>
    <Button
      variant="contained"
      sx={{
        backgroundColor:color,
        "&:hover": {
          backgroundColor: "#fff",
          color: color,
          outline: `"2px solid ${color}"`,
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
          color: color,
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
              backgroundColor:colorLighten,
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
              backgroundColor:colorLighten,
            }}
            label="password"
            name="password"
            value={signInForm.password}
            onChange={handleSignInInputChange}
          />
          <Typography
            sx={{ color: color, textAlign: "end" }}
            onClick={handleToForget}
          >
            forget Password?{" "}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: color,
            "&:hover": {
              backgroundColor: "#fff",
              color: color,
              outline: `"2px solid ${color}"`,
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
              color: color,
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
              backgroundColor:colorLighten,
            }}
            label="password"
            name="password"
            value={signInForm.password}
            onChange={handleSignUpInputChange}
          />
          <Typography
            sx={{
              color: color,
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
            backgroundColor: color,
            "&:hover": {
              backgroundColor: "#fff",
              color: color,
              outline: `"2px solid ${color}"`,
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
              backgroundColor:colorLighten,
            }}
            label="password"
            name="password"
            value={signInForm.password}
            onChange={handleSignUpInputChange}
          />
          <Typography
            sx={{
              color: color,
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
            backgroundColor: color,
            "&:hover": {
              backgroundColor: "#fff",
              color: color,
              outline: `"2px solid ${color}"`,
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
              backgroundColor:colorLighten,
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
              backgroundColor:colorLighten,
            }}
            label="password"
            name="password"
            value={signInForm.password}
            onChange={handleSignUpInputChange}
          />
          <Typography
            sx={{
              color: color,
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
            backgroundColor: color,
            "&:hover": {
              backgroundColor: "#fff",
              color: color,
              outline: `"2px solid ${color}"`,
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