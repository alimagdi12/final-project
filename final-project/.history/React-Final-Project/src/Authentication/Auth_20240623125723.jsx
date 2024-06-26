import React, { useContext, useState } from "react";
import "./Auth.css";
import { Box, Button, Typography } from "@mui/material";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ColorContext from "../contexts/ColorContext";
import { toast } from "react-toastify";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgetPassword from "./ForgetPassword";
import CheckOTP from "./CheckOTP";
import ResetPassword from "./ResetPassword";
import { NotificationContext } from "../contexts/NotificationContext";

export default function Auth() {
  const {fetchNotifications, notifications} = useContext(NotificationContext)
  const { color } = useContext(ColorContext);
  const navigate = useNavigate();

  const { setToken } = useContext(UserContext);

  const handleSignIn = async (signInForm) => {
    (signInForm);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        signInForm
      );
      if (response) {
        (response);
        setToken(response.data.user.token);
        localStorage.setItem("token", response.data.user.token);
        toast.success('Logged in successfully');
        navigate('/home');
        fetchNotifications();
      } else {
        // This block might never be reached because `response` is always truthy when the request is successful
        toast.error('Log in failed');
        console.error("Token not found in response:", response);
      }
    } catch (error) {
      toast.error('Log in failed'); // Add this line to ensure the toast is shown
      console.error("Signin failed:", error);
    }
  };  

  const handleSignUp = async (signUpForm) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        signUpForm
      );
      toast.success('Signed up successfully');
      handleToLogin();
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const [fade, setFade] = useState(false);
  const [currentView, setCurrentView] = useState('login');

  const handleToLogin = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentView('login');
      setFade(false);
    }, 300);
  };

  const handleToRegister = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentView('register');
      setFade(false);
    }, 300);
  };

  const handleToForget = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentView('forget');
      setFade(false);
    }, 300);
  };

  const handleToOtp = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentView('otp');
      setFade(false);
    }, 300);
  };

  const handleToReset = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentView('reset');
      setFade(false);
    }, 300);
  };


  return (
    <div style={{backgroundColor:color, height:'100vh'}}>
    <Box sx={{height:'100%'}} >
      <Box sx={{zIndex:'50'}} className={`clipped-element ${currentView === 'register' ? "move-bottom" : ""}`}></Box>
      {currentView === 'login' && (
        <SignIn 
          fade={fade} 
          handleSignIn={handleSignIn}
          handleToRegister={handleToRegister}
          handleToForget={handleToForget}
        />
      )}
      {currentView === 'register' && (
        <SignUp 
          fade={fade} 
          handleSignUp={handleSignUp}
          handleToLogin={handleToLogin}
        />
      )}
      {currentView === 'forget' && (
        <ForgetPassword 
          fade={fade}
          handleToLogin={handleToLogin}
          handleToOtp={handleToOtp}
        />
      )}
      {currentView === 'otp' && (
        <CheckOTP 
          fade={fade}
          handleToForget={handleToForget}
          handleToReset={handleToReset}
        />
      )}
      {currentView === 'reset' && (
        <ResetPassword 
          fade={fade}
          handleToForget={handleToForget}
          handleToLogin={handleToLogin}
        />
      )}
    </Box>
    </div>
    
  );
}
