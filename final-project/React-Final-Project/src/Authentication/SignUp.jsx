import React, { useContext, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import ColorContext from "../contexts/ColorContext";

export default function SignUp({ fade, handleSignUp, handleToLogin }) {
  const {color} = useContext(ColorContext)
  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDay: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm({
      ...signUpForm,
      [name]: value,
    });
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
  

  return (
    <Grid
      container
      className={`inputs ${fade ? "fade-out" : "fade-in"}`}
      justifyContent="center"
      alignItems="center"
      sx={{ width: "50%", margin: "auto", height:'100%', color:'white' }}
      
    >
      <Typography variant="h5" >Vibe Verse</Typography>
      <Typography variant="h5" >Create your account</Typography>
      <Grid display={'flex'} sx={{ flexWrap:'wrap', justifyContent:'space-between' }} xs={12} md={12}>
        <Grid item xs={12} md={5} >
          <TextField
            sx={textFieldStyle}
            InputLabelProps={{ style: { color: "#79987a" } }}
            label="First Name"
            name="firstName"
            value={signUpForm.firstName}
            onChange={handleSignUpInputChange}
          />
        </Grid>
        <Grid item xs={12} md={5} >
          <TextField
            sx={textFieldStyle}
            InputLabelProps={{ style: { color: "#79987a" } }}
            label="Last Name"
            name="lastName"
            value={signUpForm.lastName}
            onChange={handleSignUpInputChange}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} >
        <TextField
          sx={textFieldStyle}
          InputLabelProps={{ style: { color: "#79987a" } }}
          label="Email"
          name="email"
          value={signUpForm.email}
          onChange={handleSignUpInputChange}
        />
      </Grid>
      <Grid item xs={12} >
        <TextField
          sx={textFieldStyle}
          label="Phone Number"
          InputLabelProps={{ style: { color: "#79987a" } }}
          name="phoneNumber"
          value={signUpForm.phoneNumber}
          onChange={handleSignUpInputChange}
        />
      </Grid>
      <Grid item xs={12} >
        <TextField
          sx={textFieldStyle}
          InputLabelProps={{ style: { color: "#79987a" } }}
          label="Password"
          name="password"
          type="password"
          value={signUpForm.password}
          onChange={handleSignUpInputChange}
        />
      </Grid>
      <Grid item xs={12} >
        <TextField
          sx={textFieldStyle}
          InputLabelProps={{ style: { color: "#79987a" } }}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={signUpForm.confirmPassword}
          onChange={handleSignUpInputChange}
        />
      </Grid>
      <Grid item xs={12} >
        <TextField
          sx={textFieldStyle}
          label="Birthday"
          name="birthDay"
          type="date"
          value={signUpForm.birthDay}
          onChange={handleSignUpInputChange}
          InputLabelProps={{ shrink: true, style: { color: "#79987a" } }}
        />
      </Grid>
      <Grid item xs={12} >
        <Button
          variant="contained"
          sx={buttonStyle}
          onClick={() => handleSignUp(signUpForm)}
        >
          Register
        </Button>
      </Grid>
      <Grid item xs={12} margin={2}>
        <Typography sx={{ display: "flex", justifyContent: "center" }} margin={2}>
          Have an account? 
          <Typography
            marginX={1}
            sx={linkStyle}
            onClick={handleToLogin}
          >
            Login
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
}
