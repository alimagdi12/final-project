/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Button, TextField, Container, Grid } from "@mui/material";
import axios from "axios";
import UserContext from "../../../../contexts/UserContext";
import { toast } from "react-toastify";
import ColorContext from "../../../../contexts/ColorContext";


export default function AuctionCard({highestBid, highestBidderName,socketBid, hours, minutes, seconds, id , auction,setHighestBid}) {
  const {color} = useContext(ColorContext)
 


  const [bidderName, setBidderName] = useState("");
  const [progress, setProgress] = useState({
    hours: hours | 0,
    minutes: minutes | 0,
    seconds: seconds | 0,
  });
  useEffect(() => {
    setProgress({
      hours: hours | 0,
      minutes: minutes | 0,
      seconds: seconds | 0,
    });
  }, [hours]);







  const [bidAmount, setBidAmount] = useState("");
  // const [highestBid, setHighestBid] = useState(2500);
  const [confirmBid, setConfirmBid] = useState(false);
  const {token} = useContext(UserContext)
  const handleOneBid = () => {
    setConfirmBid(true);
  };

  const handleBid = (amount) => {
    setHighestBid((prev) => prev + amount);
  };

  const confirmBidHandler = async () => {
 
 if(bidAmount <= highestBid){
  toast.error('you muse add highe Bid')
 }
 else{
 
    console.log(id);
if(token){
    const bidAmountNumber = parseInt(bidAmount);
    if (isNaN(bidAmountNumber) || bidAmountNumber <= 0) {
      console.error("Invalid bid amount");
      return;
    }

    const bidDetails = { amount: bidAmountNumber, auctionId: id };

    
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/auth/add-bid",
        bidDetails,
        {
          headers: {
            "Content-Type": "application/json",
            jwt: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);

      if (response.data && response.data.msg) {
        console.log(response.data.msg);
      } else {
       await setHighestBid(bidAmountNumber);
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }

    setBidAmount("");
    socketBid(bidAmountNumber)
    setConfirmBid(false);
  }
  else{
    toast.error('you must login first')
  }
}
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const { hours, minutes, seconds } = prevProgress;
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prevProgress;
        }
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;
        if (newSeconds < 0) {
          newMinutes -= 1;
          newSeconds = 59;
          if (newMinutes < 0) {
            newHours -= 1;
            newMinutes = 59;
          }
        }
        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalSeconds =
    progress.hours * 3600 + progress.minutes * 60 + progress.seconds;
  const progressValue = ((12 * 3600 - totalSeconds) / (12 * 3600)) * 100;

  return (
    <Container sx={{ padding: "0 15px" }}>
      <CircularProgressWithLabel
        bidderName={bidderName}
        highestBid={highestBid}
        value={progressValue}
        highestBidderName={highestBidderName}
        hours={progress.hours}
        minutes={progress.minutes}
        seconds={progress.seconds}
        auction = {auction}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <TextField
          label="Place Bid"
          variant="outlined"
          InputLabelProps={{ style: { color: color } }}
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              fontWeight: "bold",
              color: "black",
              borderColor: color,
              "&:hover fieldset": {
                borderColor: color,
              },
              "& fieldset": {
                borderColor: color,
                backgroundColor: "",
              },
              "&.Mui-focused fieldset": {
                borderColor: color,
              },
            },
            width: { xs: "100%", sm: "70%" },
          }}
        />
        <Box
          display="flex"
          alignItems="center"
          mt={2}
          sx={{ width: { xs: "100%", sm: "70%" }, justifyContent: "center" }}
        >
          <Button
            sx={{
              width: "100%",
              backgroundColor: color,
              "&:hover":{backgroundColor:color}
            }}
            variant="contained"
            color="primary"
            onClick={confirmBid ? confirmBidHandler : handleOneBid}
          >
            {confirmBid ? "Confirm" : "Place Bid"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

function CircularProgressWithLabel({auction, highestBidderName,highestBid,value,hours,minutes,seconds}) {
  const {color} = useContext(ColorContext)
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderRadius: "50%",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={100}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "400px",
          maxHeight: "400px",
          "& circle[stroke-width]": {
            strokeWidth: "2px",
          },
          color: "#E9EEF1",
          position: "absolute",
        }}
        thickness={2}
        strokeLinecap={"round"}
      />
      <CircularProgress
        sx={{ strokeDashoffset: "100%" }}
        variant="determinate"
        value={value}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "400px",
          maxHeight: "400px",
          "& circle[stroke-width]": {
            strokeWidth: "2px",
          },
          color: color,
          borderRadius: "50%",
          strokeLinecap: "rounded",
        }}
        thickness={2}
      />

      <Box
        sx={{
          top: 30,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 10px",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: "15px",
            fontWeight: "700",
            fontSize: { xs: "20px", md: "28px" },
          }}
        >
          {auction?.title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: "15px",
            fontWeight: "700",
            fontSize: { xs: "20px", md: "28px" },
            backgroundColor: color,
            borderRadius: "10px",
            padding: "0px 17px",
            color: "#fff",
          }}
        >
          {highestBid}$
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: "15px",
            fontWeight: "700",
            fontSize: { xs: "20px", md: "28px" },
          }}
        >
       {highestBidderName}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: "15px",
            fontSize: { xs: "12px", md: "13px" },
            fontWeight: "bold",
          }}
        >
          Time left
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "20px", md: "25px" },
            padding: "0px 20px",
            margin: "0",
            borderRadius: "5px",
            marginBottom: "15px",
            backgroundColor: color,
            fontWeight: "bold",
            color: "#fff",  
          }}
          variant="caption"
          component="div"
        >
          {`${hours}:${minutes}:${seconds}`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  bidderName: PropTypes.string.isRequired,
  highestBid: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};