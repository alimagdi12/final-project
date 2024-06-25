import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { OrderRow } from "./OrderRow";
import { OrderContext } from "../../../../contexts/OrderContext";
import ColorContext from "../../../../contexts/ColorContext";
import ProductsContext from "../../../../contexts/ProductsContext";

const OrderList = () => {
  const { orders } = useContext(OrderContext);
  const { color, lightColor } = useContext(ColorContext);
  const {products} = useContext(ProductsContext)

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
      {orders?.orders?.map((order, index) => (
        <OrderRow 
          key={index} 
          order={order} 
          imageUrl={order.productImg} // Pass the image URL as a prop to OrderRow
        />
      ))}
    </Grid>
  );
};

export default OrderList;
