import React from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from "@mui/icons-material/History";
import PaymentsIcon from "@mui/icons-material/Payments";

const NAVIGATION = [
   { kind: 'header', title: 'Main items' },
   {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon />,
      element: <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>,
   },
   {
      segment: 'orders',
      title: 'Orders',
      icon: <ShoppingCartIcon />,
      element: <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit' }}>Orders</Link>,
   },
   {
      segment: 'tbb',
      title: 'Trash Before Burn',
      icon: <ShoppingCartIcon />,
      element: <Link to="/tbb" style={{ textDecoration: 'none', color: 'inherit' }}>Trash Before Burn</Link>,
   },
   {
      segment: 'deliveryboypayout',
      title: 'PayOut',
      icon: <PaymentsIcon />,
      element: <Link to="/deliveryboypayout" style={{ textDecoration: 'none', color: 'inherit' }}>PayOut</Link>,
   },
   {
      segment: 'paymenthistory',
      title: 'Payment History',
      icon: <HistoryIcon />,
      element: <Link to="/paymenthistory" style={{ textDecoration: 'none', color: 'inherit' }}>Payment History</Link>,
   },
   { kind: 'divider' },
   //{ kind: 'header', title: 'Analytics' },
  
   
];

export default NAVIGATION;
