import React, { useContext } from "react";
import { Box, Grid, Typography, Avatar, Button } from "@mui/material";
import { styled } from "@mui/system";

import { OrderContext } from "../../../../contexts/OrderContext";
const TotalButton = styled(Button)({
  background: "linear-gradient(45deg, #FF8E53 30%, #AC51CC 90%)",
  borderRadius: "20px",
  color: "#fff",
  fontWeight: "bold",
});

export const OrderRow = ({ order, onCancel }) => {
  const { orders } = useContext(OrderContext);
  console.log(orders);
  const handleCancel = () => {
    // Call the onCancel function with the order id
    // onCancel(order.id);
  };

  return (
    <Grid
      container
      alignItems="center"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        padding: "16px 0",
        borderBottom: "2px solid #AC51CC",
        color: "white",
      }}
    >
      <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
        <TotalButton>{`Total ${order.totalAmount}`}</TotalButton>
      </Grid>
      <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ width: "60%" , fontSize:'5px' }}>{order._id}</Typography>
      </Grid>
      <Grid item xs>
        <Typography>{order.userId.firstName}</Typography>
        <Typography variant="body2">{order.email}</Typography>
      </Grid>
      <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>{order.payment}</Typography>
      </Grid>
      <Grid item xs>
        <Avatar
          src={order.productImg}
          alt="product"
          sx={{ width: 56, height: 56 }}
        />
      </Grid>
      <Grid item xs>
        <Typography>{order.delivery}</Typography>
      </Grid>
      <Grid item xs>
        <Box
          sx={{
            backgroundColor: order.statusColor,
            borderRadius: "8px",
            padding: "4px 8px",
            textAlign: "center",
            color: "black",
          }}
        >
          <Typography>{order.status}</Typography>
        </Box>
      </Grid>
      {/* Display cancel button if the order status is pending or waiting */}
      {(order.status === "Waiting" || order.status === "Pending") && (
        <Grid item xs>
          <Button variant="contained" color="error" onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
