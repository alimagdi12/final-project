import React, { useContext, useState, useEffect } from "react";
import { Grid, Typography, Avatar, Button, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/system";

import { OrderContext } from "../../../../contexts/OrderContext";
import ColorContext from "../../../../contexts/ColorContext";

export const OrderRow = ({ order, imageUrl }) => {
    const { color, lightColor } = useContext(ColorContext);
    const { deleteOrder, updateOrderStatus } = useContext(OrderContext);

    const [status, setStatus] = useState(order.status || "Pending"); // Initialize status state

    useEffect(() => {
        setStatus(order.status || "Pending");
    }, [order.status]); // Update status state when order status changes

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value; // Get the selected value from event
        setStatus(newStatus); // Update local state

        // Call backend API to update order status
        try {
            await updateOrderStatus(order._id, newStatus); // Assuming updateOrderStatus handles API call
        } catch (error) {
            console.error("Failed to update order status:", error);
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
                textAlign: 'center'
            }}
        >
            <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
                <TotalButton>{`Total ${order.totalAmount}`}</TotalButton>
            </Grid>
            <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ width: "60%", fontSize: '10px' }}>{order._id}</Typography>
            </Grid>
            <Grid item xs>
                <Typography>{order.userId.firstName}</Typography>
                <Typography variant="body2">{order.email}</Typography>
            </Grid>
            <Grid item xs>
                <select value={status} onChange={handleStatusChange}>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Canceled">Canceled</option>
                </select>
            </Grid>
        </Grid>
    );
};
