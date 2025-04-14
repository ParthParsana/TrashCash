import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import NAVIGATION from './navigation';
import demoTheme from './theme';

// Import Components
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import DeliveryBoyPayout from './components/DeliveryBoyPayout';
import PaymentHistory from './components/PaymentHistory';
import Tbb from './components/Tbb';


function DashboardLayoutBasic(props) {
   const { window } = props;

   return (
      <Router>
         <AppProvider navigation={NAVIGATION} theme={demoTheme} window={window} branding={{
            logo: "",
            title: <span style={{ color: 'lightgreen', fontSize: '26px' }}>Trash-Cash</span>
         }} >
            <DashboardLayout >
               <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/tbb" element={<Tbb />} />
                  <Route path="/deliveryboypayout" element={<DeliveryBoyPayout />} />
                  <Route path="/paymenthistory" element={<PaymentHistory />} />
               </Routes>
            </DashboardLayout>
         </AppProvider>
      </Router >
   );
}

DashboardLayoutBasic.propTypes = {
   window: PropTypes.func,
};

export default DashboardLayoutBasic;
