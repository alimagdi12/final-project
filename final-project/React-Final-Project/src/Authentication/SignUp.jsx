import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export default function SignUp({ fade, handleSignUp, handleToLogin }) {
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

  return (
    <Grid
      container
      className={`inputs ${fade ? "fade-out" : "fade-in"}`}
      justifyContent="center"
      alignItems="center"
      sx={{ width: "75%", margin: "auto" }}
    >
      <Typography variant="h5" margin={1}>Vibe Verse</Typography>
      <Typography variant="h5" margin={1}>Create your account</Typography>
      <Grid display={'flex'} sx={{ flexWrap:'wrap', justifyContent:'space-between' }} xs={12} md={12}>
        <Grid item xs={12} md={5} margin={1}>
          <TextField
            sx={textFieldStyle}
            InputLabelProps={{ style: { color: "#79987a" } }}
            label="First Name"
            name="firstName"
            value={signUpForm.firstName}
            onChange={handleSignUpInputChange}
          />
        </Grid>
        <Grid item xs={12} md={5} margin={1}>
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
      <Grid item xs={12} margin={1}>
        <TextField
          sx={textFieldStyle}
          InputLabelProps={{ style: { color: "#79987a" } }}
          label="Email"
          name="email"
          value={signUpForm.email}
          onChange={handleSignUpInputChange}
        />
      </Grid>
      <Grid item xs={12} margin={1}>
        <TextField
          sx={textFieldStyle}
          label="Phone Number"
          name="phoneNumber"
          value={signUpForm.phoneNumber}
          onChange={handleSignUpInputChange}
        />
      </Grid>
      <Grid item xs={12} margin={1}>
        <TextField
          sx={textFieldStyle}
          label="Password"
          name="password"
          type="password"
          value={signUpForm.password}
          onChange={handleSignUpInputChange}
        />
      </Grid>
      <Grid item xs={12} margin={1}>
        <TextField
          sx={textFieldStyle}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={signUpForm.confirmPassword}
          onChange={handleSignUpInputChange}
        />
      </Grid>
      <Grid item xs={12} margin={1}>
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
      <Grid item xs={12} margin={1}>
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
      <Grid item xs={12} md={6} margin={1}>
        <img src="bro.png" className="regImg" alt="" />
      </Grid>
    </Grid>
  );
}

const textFieldStyle = {
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
