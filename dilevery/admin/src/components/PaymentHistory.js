import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip } from "@mui/material";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);

  // Fetch all payment history
  useEffect(() => {
    fetch("http://localhost:8080/payout/all") // Adjust endpoint if needed
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((error) => console.error("Error fetching payment history:", error));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ margin: "20px", padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Payment History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>UPI ID</b></TableCell>
            <TableCell><b>Amount (₹)</b></TableCell>
            <TableCell><b>Remarks</b></TableCell>
            <TableCell><b>Status</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.upiId}</TableCell>
                <TableCell>₹{payment.amount}</TableCell>
                <TableCell>{payment.remarks || "N/A"}</TableCell>
                <TableCell>
                  <Chip
                    label={payment.status}
                    color={payment.status === "Completed" ? "success" : "warning"}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No payment history found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentHistory;
