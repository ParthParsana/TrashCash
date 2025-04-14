import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const DeliveryBoyDashboard = () => {
   const [orders, setOrders] = useState([]);
   const [payouts, setPayouts] = useState([]);
   const [totalPayout, setTotalPayout] = useState(0);
   const [loading, setLoading] = useState(true);
   const [location, setLocation] = useState({ address: "Fetching..." });

   // Fetch orders and payouts data
   useEffect(() => {
      const fetchData = async () => {
         try {
            const ordersRes = await fetch("http://localhost:8080/api/orders/all");
            const ordersData = await ordersRes.json();
            setOrders(ordersData);

            const payoutsRes = await fetch("http://localhost:8080/payout/all");
            const payoutsData = await payoutsRes.json();
            setPayouts(payoutsData);

            // Calculate total payout amount
            const total = payoutsData.reduce((sum, payout) => sum + payout.amount, 0);
            setTotalPayout(total);

            setLoading(false);
         } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   // Fetch Address from Lat/Lng
   const fetchAddress = async (lat, lng) => {
      try {
         const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
         const data = await response.json();
         if (data && data.display_name) {
            setLocation({ address: data.display_name });
         } else {
            setLocation({ address: "Address not found" });
         }
      } catch (error) {
         console.error("Error fetching address:", error);
         setLocation({ address: "Error fetching address" });
      }
   };

   // Fetch live location
   useEffect(() => {
      if ("geolocation" in navigator) {
         navigator.geolocation.watchPosition(
            (position) => {
               const { latitude, longitude } = position.coords;
               fetchAddress(latitude, longitude);
            },
            (error) => console.error("Error fetching location:", error),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
         );
      } else {
         console.error("Geolocation not supported");
      }
   }, []);

   if (loading) {
      return <CircularProgress />;
   }

   return (
      <Box sx={{ p: 2 }}>
         <Typography variant="h5" gutterBottom>
            🚚 Delivery Boy Dashboard
         </Typography>

         <Grid container spacing={2}>
            {/* 📍 Live Location */}
            <Grid item xs={12} md={4}>
               <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <LocationOnIcon fontSize="large" color="primary" />
                  <Typography variant="h6">📍 Live Location</Typography>
                  <Typography variant="body2">
                     🏡 Address: {location.address}
                  </Typography>
               </Paper>
            </Grid>

            {/* 🚚 Total Orders */}
            <Grid item xs={12} md={4}>
               <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <LocalShippingIcon fontSize="large" color="secondary" />
                  <Typography variant="h6">📦 Total Orders</Typography>
                  <Typography variant="h4">{orders.length}</Typography>
               </Paper>
            </Grid>

            {/* 💰 Total Payout */}
            <Grid item xs={12} md={4}>
               <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <PaymentsIcon fontSize="large" color="success" />
                  <Typography variant="h6">💰 Total Payout</Typography>
                  <Typography variant="h4">₹{totalPayout}</Typography>
               </Paper>
            </Grid>

            {/* 📊 Recent Orders */}
            <Grid item xs={12} md={6}>
               <Paper sx={{ p: 2 }}>
                  <Typography variant="h6">📦 Recent Orders</Typography>
                  <List>
                     {orders.slice(0, 5).map((order) => (
                        <ListItem key={order.id}>
                           <ListItemText
                              primary={`Order ID: ${order.id}`}
                              secondary={`Address: ${order.address} • Status: ${order.status}`}
                           />
                        </ListItem>
                     ))}
                  </List>
               </Paper>
            </Grid>

            {/* 💰 Recent Payouts */}
            <Grid item xs={12} md={6}>
               <Paper sx={{ p: 2 }}>
                  <Typography variant="h6">💰 Recent Payouts</Typography>
                  <List>
                     {payouts.slice(0, 5).map((payout) => (
                        <ListItem key={payout.id}>
                           <ListItemText
                              primary={`Payout ID: ${payout.id}`}
                              secondary={`Amount: ₹${payout.amount} • Status: ${payout.status}`}
                           />
                        </ListItem>
                     ))}
                  </List>
               </Paper>
            </Grid>
         </Grid>
      </Box>
   );
};

export default DeliveryBoyDashboard;
