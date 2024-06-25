/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { NotificationContext } from "../contexts/NotificationContext";

export default function SignIn({ fade, handleSignIn, handleToRegister, handleToForget }) {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const handleSignInInputChange = (e) => {
    const { name, value } = e.target;
    setSignInForm({
      ...signInForm,
      [name]: value,
    });
    console.log(signInForm);
  };

  
const textFieldStyle = {
  width: "100%",
  marginBottom: "16px",
  backgroundColor: "rgba(0, 255, 0, 0.1)",
  "& .MuiInputBase-input": {
    color: "white", // Text color
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgb(150, 187, 124)",
    color: "rgb(150, 187, 124)",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "rgb(150, 187, 124)",
    },
  },
};

const buttonStyle = {
  backgroundColor: "rgb(150, 187, 124)",
  "&:hover": {
    backgroundColor: "rgb(160, 200, 100)",
  },
  color: "#fff",
  padding: "10px 20px",
  fontSize: "18px",
  borderRadius: "30px",
  width: "100%",
};

const linkStyle = {
  fontWeight: 800,
  fontSize: 16,
  cursor: "pointer",
  textDecoration: "underline",
  color: "rgb(150, 187, 124)",
};

const {fetchNotifications, notifications} = useContext(NotificationContext)

useEffect(()=>{
  fetchNotifications()
},[notifications])

  return (
    <div style={{  height:'100%', display:'flex', justifyContent:'center',alignItems:'center', alignContent:'center', textAlign:'center', color:'white' }}>

    <Box className={`inputs ${fade ? "fade-out" : "fade-in"}`} sx={{ width: "50%", height:'100%', display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center', alignContent:'center', textAlign:'center', color:'white' }}>

      <Box sx={{ width: '100%' }}>

        <Typography variant="h5" margin={1}>Vibe Verse</Typography>
        <Typography variant="h5" margin={1}>Log In to your account</Typography>
      </Box>
      <Grid container display={'flex'} justifyContent="center" alignItems="center" sx={{}}>
        <Grid item xs={12} margin={1}>
          <TextField
            sx={textFieldStyle}
            InputLabelProps={{ style: { color: "#79987a" } }}
            label="Email"
            name="email"
            value={signInForm.email}
            onChange={handleSignInInputChange}
          />
        </Grid>
        <Grid item xs={12} margin={1}>
          <TextField
            sx={textFieldStyle}
            InputLabelProps={{ style: { color: "#79987a" } }}
            label="Password"
            name="password"
            type="password"
            value={signInForm.password}
            onChange={handleSignInInputChange}
          />
        </Grid>
        <Grid item xs={12} margin={1}>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => handleSignIn(signInForm)}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12} margin={1}>
          <Typography marginTop={1}>
            Don't have an account?
            <Typography
              marginX={1}
              sx={linkStyle}
              onClick={handleToRegister}
            >
              Register
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} margin={1}>
          {/* <Typography
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={handleToForget}
          >
            Forgot Password?
          </Typography> */}
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}


