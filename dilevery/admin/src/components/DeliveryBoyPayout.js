import { useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";

const DeliveryBoyPayout = () => {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isValidUpi, setIsValidUpi] = useState(null);
  const [isValidAmount, setIsValidAmount] = useState(true);

  // UPI ID Validation Function
  const validateUpi = (upi) => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/;
    return upiRegex.test(upi);
  };

  // Handle Input Change for UPI ID
  const handleUpiChange = (e) => {
    const value = e.target.value;
    setUpiId(value);
    setIsValidUpi(validateUpi(value));
  };

  // Handle Input Change for Amount
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setIsValidAmount(value >= 1); // Amount must be at least ₹1
  };

  // Handle payout request submission
  const requestPayout = async () => {
    if (!isValidUpi || !isValidAmount) {
      alert("Please enter a valid UPI ID and amount (₹1 or more).");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/payout/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ upiId, amount, remarks }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      alert("Request Submitted! Request ID: " + (data.id || "N/A"));

      // Clear input fields
      setUpiId("");
      setAmount("");
      setRemarks("");
      setIsValidUpi(null);
      setIsValidAmount(true);
    } catch (error) {
      console.error("Error submitting payout request:", error);
      alert("Failed to submit payout request. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 30 }}>
        <Typography variant="h5" gutterBottom>
          Request Payout
        </Typography>

        <TextField
          label="UPI ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={upiId}
          onChange={handleUpiChange}
          error={isValidUpi === false}
          helperText={isValidUpi === false ? "Invalid UPI ID format" : ""}
        />

        <TextField
          label="Amount (₹)"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={amount}
          onChange={handleAmountChange}
          error={!isValidAmount}
          helperText={!isValidAmount ? "Amount must be at least ₹1" : ""}
        />

        <TextField
          label="Remarks (Optional)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={requestPayout}
          style={{ marginTop: 10 }}
          disabled={!isValidUpi || !isValidAmount}
        >
          Submit Payout Request
        </Button>
      </Paper>
    </Container>
  );
};

export default DeliveryBoyPayout;
