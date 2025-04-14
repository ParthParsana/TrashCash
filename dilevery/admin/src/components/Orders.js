import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import axios from "axios";

function Orders() {
  return (
    <div className="Orders" style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Orders for Pick-up
      </Typography>
      <AllOrders />
    </div>
  );
}

function AllOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const statusOptions = ["Out for Pick-up", "Order Completed"];

  const fetchOrders = async () => {
    const REST_API_BASE_URL = "http://localhost:8080/api/orders/out-for-pickup";
    try {
      setLoading(true);
      const response = await axios.get(REST_API_BASE_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDataSource(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setSnackbar({ open: true, message: "Failed to fetch orders.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (value, id) => {
    try {
      await axios.patch(`http://localhost:8080/api/orders/${id}/status`, null, {
        params: { newStatus: value },
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedData = dataSource.map((order) =>
        order.id === id ? { ...order, status: value } : order
      );
      setDataSource(updatedData);
      setFilteredData(updatedData);

      setSnackbar({ open: true, message: `Order ID ${id} status updated to ${value}`, severity: "success" });
    } catch (error) {
      console.error("Error updating order status:", error);
      setSnackbar({ open: true, message: "Failed to update order status.", severity: "error" });
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["ID", "Order ID", "Name", "Email", "Mobile", "Location", "Weight", "Date", "Remarks", "Status"].map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.mobileNumber}</TableCell>
                <TableCell>{order.currentLocation}</TableCell>
                <TableCell>{order.weight}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.remarks}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e) => handleStatusChange(e.target.value, order.id)}
                    size="small"
                  >
                    {statusOptions.map((statusOption) => (
                      <MenuItem key={statusOption} value={statusOption}>
                        {statusOption}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Orders;
