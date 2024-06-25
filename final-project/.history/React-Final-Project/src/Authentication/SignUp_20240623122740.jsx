import React, { useContext, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import ColorContext from "../contexts/ColorContext";

export default function SignUp({ fade, handleSignUp, handleToLogin }) {
  const { color } = useContext(ColorContext);
  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDay: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = "";
    switch (name) {
      case "firstName":
        if (!value) errorMsg = "First Name is required";
        break;
      case "lastName":
        if (!value) errorMsg = "Last Name is required";
        break;
      case "email":
        if (!value) {
          errorMsg = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = "Email is invalid";
        }
        break;
      case "phoneNumber":
        if (!value) {
          errorMsg = "Phone Number is required";
        } else if (!/^\d{11}$/.test(value)) {
          errorMsg = "Phone Number is invalid";
        }
        break;
      case "password":
        if (!value) errorMsg = "Password is required";
        break;
      case "confirmPassword":
        if (!value) {
          errorMsg = "Confirm Password is required";
        } else if (value !== signUpForm.password) {
          errorMsg = "Passwords do not match";
        }
        break;
      case "birthDay":
        if (!value) {
          errorMsg = "Birthday is required";
        }  else {
          const selectedDate = new Date(value);
          const maxDate = new Date("2018-12-31");
          if (selectedDate > maxDate) {
            errorMsg = "Birthday cannot be later than 2018";
          }
        }
        break;
      default:
        break;
    }
    return errorMsg;
  };

  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm({
      ...signUpForm,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: validateField(name, value),
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMsg,
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

  const errorStyle = {
    color: "red",
    fontSize: "12px",
    marginTop: "-10px",
    marginBottom: "10px",
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
      sx={{ width: "50%", margin: "auto", height: "100%", color: "white" }}
    >
      <Typography variant="h5">Vibe Verse</Typography>
      <Typography variant="h5">Create your account</Typography>
      <Grid
        display={"flex"}
        sx={{ flexWrap: "wrap", justifyContent: "space-between" }}
        xs={12}
        md={12}
      >
        <Grid item xs={12} md={5}>
          <TextField
            sx={textFieldStyle}
            InputLabelProps={{ style: { color: "#79987a" } }}
            label="First Name"
            name="firstName"
            value={signUpForm.firstName}
            onChange={handleSignUpInputChange}
            onBlur={handleBlur}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            sx={textFieldStyle}
            InputLabelProps={{ style: { color: "#79987a" } }}
            label="Last Name"
            name="lastName"
            value={signUpForm.lastName}
            onChange={handleSignUpInputChange}
            onBlur={handleBlur}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={textFieldStyle}
          InputLabelProps={{ style: { color: "#79987a" } }}
          label="Email"
          name="email"
          value={signUpForm.email}
          onChange={handleSignUpInputChange}
          onBlur={handleBlur}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={textFieldStyle}
          label="Phone Number"
          InputLabelProps={{ style: { color: "#79987a" } }}
          name="phoneNumber"
          value={signUpForm.phoneNumber}
          onChange={handleSignUpInputChange}
          onBlur={handleBlur}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={textFieldStyle}
          InputLabelProps={{ style: { color: "#79987a" } }}
          label="Password"
          name="password"
          type="password"
          value={signUpForm.password}
          onChange={handleSignUpInputChange}
          onBlur={handleBlur}
          error={!!errors.password}
          helperText={errors.password}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={textFieldStyle}
          InputLabelProps={{ style: { color: "#79987a" } }}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={signUpForm.confirmPassword}
          onChange={handleSignUpInputChange}
          onBlur={handleBlur}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={textFieldStyle}
          label="Birthday"
          name="birthDay"
          type="date"
          value={signUpForm.birthDay}
          onChange={handleSignUpInputChange}
          InputLabelProps={{ shrink: true, style: { color: "#79987a" } }}
          onBlur={handleBlur}
          error={!!errors.birthDay}
          helperText={errors.birthDay}
        />
      </Grid>
      <Grid item xs={12}>
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
          <Typography marginX={1} sx={linkStyle} onClick={handleToLogin}>
            Login
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
}
