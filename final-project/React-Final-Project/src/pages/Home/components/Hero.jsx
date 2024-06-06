import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";

export default function Hero() {
  return (
    <Box
      className="d-flex justify-content-center align-items-center m-auto"
      sx={{ height: "100vh", width: "100%" }}
    >
      <Box />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <img
          src="/public/space2.webp"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          // allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "120%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          top: "30%",
          height: "100%",
          width: "100%",
          zIndex: 1,
          textAlign: "center",
          color: "white",
          padding: "0px",
          border: "0px",
        }}
      >
        <Typography variant="h3" margin={"30px"}>
          VibeVerse Buy and Sell anything
        </Typography>
        <TextField
          placeholder="Enter your text here"
          sx={{
            width: { xs: "80%", md: "50%" },
            margin: "auto",
            background: "#ccc",
            borderRadius: "20px",
            "& fieldset": {
              border: "none",
            },
          }}
        />
      </Box>
    </Box>
  );
}
