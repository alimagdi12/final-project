import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Button, TextField, Container, Grid } from "@mui/material";

function CircularProgressWithLabel(props) {
    return (
        <Box
            sx={{
                position: "relative",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                width: '100%',
                borderRadius: '50%'
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
                    '& circle[stroke-width]': {
                        strokeWidth: '2px'
                    },
                    color: '#98D19B',
                    position: 'absolute',
                }}
                thickness={2}
                strokeLinecap={'round'}
            />
            <CircularProgress
                sx={{ strokeDashoffset: '100%' }}
                variant="determinate"
                value={props.value}
                style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "400px",
                    maxHeight: "400px",
                    '& circle[stroke-width]': {
                        strokeWidth: '2px'
                    },
                    color: '#5DAA60',
                    borderRadius: '50%',
                    strokeLinecap: 'rounded'
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
                    padding: "0 10px"
                }}
            >
                <Typography variant="subtitle1" sx={{ marginBottom: "15px", fontWeight: '700', fontSize: { xs: '20px', md: '28px' } }}>
                    {props.bidderName}
                </Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: "15px", fontWeight: '700', fontSize: { xs: '20px', md: '28px' }, backgroundColor: '#5DAA60', borderRadius: '10px', padding: '0px 17px', color: '#fff' }}>
                    {props.highestBid}$
                </Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: "15px", fontWeight: '700', fontSize: { xs: '20px', md: '28px' } }}>
                    Highest Bidder
                </Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: "15px", fontSize: { xs: '12px', md: '13px' }, fontWeight: 'bold' }}>
                    Time left
                </Typography>
                <Typography
                    sx={{
                        fontSize: { xs: "20px", md: "25px" },
                        padding: "0px 20px",
                        margin: "0",
                        borderRadius: "5px",
                        marginBottom: "15px",
                        backgroundColor: '#92E3A9',
                        fontWeight: 'bold',
                    }}
                    variant="caption"
                    component="div"
                >
                    {`${props.hours}:${props.minutes}:${props.seconds}`}
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
    seconds: PropTypes.number.isRequired
};

export default function AuctionCard({hoours}) {
    const [progress, setProgress] = useState({
        hours: 3,
        minutes: 0,
        seconds: 10
    });
    const [bidderName, setBidderName] = useState("Mohamed Ayman");
    const [bidAmount, setBidAmount] = useState('');
    const [highestBid, setHighestBid] = useState(2500);
    const [confirmBid, setConfirmBid] = useState(false);

    const handleOneBid = () => {
        setConfirmBid(true);
    };

    const handleBid = (amount) => {
        setHighestBid((prev) => prev + amount);
    };

    const confirmBidHandler = () => {
        handleBid(parseInt(bidAmount));
        setBidAmount('');
        setConfirmBid(false);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prevProgress => {
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
    const progressValue = (12 * 3600 - totalSeconds) / (12 * 3600) * 100;

    return (
        <Container sx={{ padding: '0 15px' }}>
            <CircularProgressWithLabel
                bidderName={bidderName}
                highestBid={highestBid}
                value={progressValue}
                hours={progress.hours}
                minutes={progress.minutes}
                seconds={progress.seconds}
            />
            <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                <TextField
                    label="Place Bid"
                    variant="outlined"
                    InputLabelProps={{ style: { color: '#5DAA60' } }}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            fontWeight: 'bold',
                            color: 'black',
                            borderColor: '#5DAA60',
                            '&:hover fieldset': {
                                borderColor: '#5DAA60',
                            },
                            '& fieldset': {
                                borderColor: '#5DAA60',
                                backgroundColor: '',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#5DAA60',
                            },
                        },
                        width: { xs: '100%', sm: '70%' },
                    }}
                />
                <Box display="flex" alignItems="center" mt={2}
                    sx={{ width: { xs: '100%', sm: '70%' }, justifyContent: 'center' }}
                >
                    <Button
                        sx={{ width: '100%', backgroundColor: '#5DAA60', '&:hover': { backgroundColor: '#3abf3a' } }}
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
