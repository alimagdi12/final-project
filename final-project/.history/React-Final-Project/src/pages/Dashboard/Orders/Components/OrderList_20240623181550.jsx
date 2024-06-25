import React, { useContext } from "react";
import { Box, Grid, Typography, Avatar, Button } from "@mui/material";
import { styled } from "@mui/system";
import { OrderRow } from "./OrderRow";
import { OrderContext } from "../../../../contexts/OrderContext";
import ColorContext from "../../../../contexts/ColorContext";

const data = [
  {
    id: "01256",
    name: "Omar Hassan",
    email: "saraayman855@gmail.com",
    payment: "Transfer",
    productImg: "../../../../../public/product1.avif",
    delivery: "Home Delivery",
    status: "Waiting",
    total: "33.500$",
    statusColor: "yellow",
  },
  {
    id: "2369",
    name: "Omar Gaber",
    email: "saraayman855@gmail.com",
    payment: "Cash",
    productImg: "../../../../../public/product2.avif",
    delivery: "Home Delivery",
    status: "Delivered",
    total: "10.300$",
    statusColor: "green",
  },
  {
    id: "5698",
    name: "Mohamed Ayman",
    email: "saraayman855@gmail.com",
    payment: "Transfer",
    productImg: "../../../../../public/product3.avif",
    delivery: "Home Delivery",
    status: "Cancel",
    total: "29.500$",
    statusColor: "red",
  },
  {
    id: "6987",
    name: "Ali ",
    email: "saraayman855@gmail.com",
    payment: "Cash",
    productImg: "../../../../../public/product4.avif",
    delivery: "Home Delivery",
    status: "Delivered",
    total: "16.000$",
    statusColor: "green",
  },
  {
    id: "9864",
    name: "Sara Ayman",
    email: "saraayman855@gmail.com",
    payment: "Transfer",
    productImg: "../../../../../public/product5.avif",
    delivery: "Home Delivery",
    status: "Cancel",
    total: "39.000$",
    statusColor: "red",
  },
];

const OrderList = () => {
  const { orders, userOrders, createOrder, getOrder, getUserOrders, setOrders } = useContext(OrderContext);
  const { color, lightColor } = useContext(ColorContext);

  const GradientText = styled(Typography)(({ theme }) => ({
    background: `linear-gradient(45deg, ${color} 30%, ${lightColor} 70%)`,
    WebkitBackgroundClip: "text",
    display: "flex",
    justifyContent: "center",
    WebkitTextFillColor: "transparent",
    fontWeight: "bold",
  }));
  return (
    <Grid
      container
      sx={{
        height: "100%",
        alignContent: "flex-start",
        alignItems: "center",
        display: "flex",
        padding: "24px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        justifyContent: "space-around",
      }}
    >
      <Grid
        spacing={2}
        sx={{
          alignContent: "flex-start",
          alignItems: "center",
          display: "flex",
          borderBottom: `2px solid ${color}`,
          width: "100%",
          padding: "0",
          justifyContent: "space-around",
        }}
      >
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <GradientText variant="h6">Total</GradientText>
        </Grid>
        <Grid item>
          <GradientText variant="h6">ID</GradientText>
        </Grid>
        <Grid item maxWidth={1}>
          <GradientText variant="h6">Name</GradientText>
        </Grid>
        <Grid item maxWidth={100}>
          <GradientText variant="h6">Payment</GradientText>
        </Grid>
        <Grid item>
          <GradientText variant="h6">Product</GradientText>
        </Grid>
        <Grid item>
          <GradientText variant="h6">Delivery</GradientText>
        </Grid>
        <Grid item>
          <GradientText variant="h6">Status</GradientText>
        </Grid>
      </Grid>
      {<orders className="or"></orders>.map((order, index) => (
        <OrderRow key={index} order={order} />
      ))}
    </Grid>
  );
};

export default OrderList;
