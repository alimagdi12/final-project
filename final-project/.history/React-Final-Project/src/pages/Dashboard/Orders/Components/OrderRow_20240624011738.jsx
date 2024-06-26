import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, Typography, Avatar, Button, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/system";

import { OrderContext } from "../../../../contexts/OrderContext";
import ColorContext from "../../../../contexts/ColorContext";
import { CartContext } from "../../../../contexts/CartContext";
import ProductsContext from "../../../../contexts/ProductsContext";
// import { CartContext } from "../../../../contexts/CartContext";

export const OrderRow = ({ order }) => {
    const { color, lightColor } = useContext(ColorContext);
    const {orders, deleteOrder, updateOrderStatus } = useContext(OrderContext);
    const {cartItems} = useContext(CartContext)
    const {products} = useContext(ProductsContext)
    (orders);
    (cartItems);
    (products);
    const [status, setStatus] = useState(order.status || "Pending");

    useEffect(() => {
        setStatus(order.status || "Pending");
    }, [order.status]);

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);

        if (newStatus === "Canceled") {
            await deleteOrder(order._id);
        } else {
            await updateOrderStatus(order._id, newStatus);
        }
    };

    const TotalButton = styled(Button)({
        background: `linear-gradient(45deg, ${color} 30%, ${lightColor} 90%)`,
        borderRadius: "20px",
        color: "#fff",
        fontWeight: "bold",
    });

    return (
        <Grid
            container
            alignItems="center"
            sx={{
                display: "flex",
                justifyContent: "space-around",
                padding: "16px 0",
                borderBottom: `2px solid ${color}`,
                color: color,
            }}
        >
            <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
                <TotalButton>{`Total ${order.totalAmount}`}</TotalButton>
            </Grid>
            <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ width: "60%", fontSize: '5px' }}>{order._id}</Typography>
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
                    src={products?.products?.imageUrl?.images[0]}
                    alt="product"
                    sx={{ width: 56, height: 56 }}
                />
            </Grid>
            <Grid item xs>
                <Typography>{order.delivery}</Typography>
            </Grid>
            <Grid item xs>
                <Select
                    value={status}
                    placeholder="pending"
                    onChange={handleStatusChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Order Status' }}
                >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Accepted">Accepted</MenuItem>
                    <MenuItem value="Canceled">Canceled</MenuItem>
                </Select>
            </Grid>
        </Grid>
    );
};
