import { useEffect, useState } from "react";
import { Table, Button, message, Typography, Space } from "antd";

const { Title } = Typography;

const Reviews = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all payout requests
  useEffect(() => {
    fetch("http://localhost:8080/payout/all")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching payout requests:", error));
  }, []);

  // Approve Payout
  const approvePayout = async (requestId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/payout/process?requestId=${requestId}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to approve payout");
      }

      const data = await response.json();
      message.success("Payout Approved: " + data.status);

      // Update the request status in UI
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === requestId ? { ...req, status: "Completed" } : req
        )
      );
    } catch (error) {
      console.error("Error approving payout:", error);
      message.error("Failed to approve payout. Please try again.");
    }
    setLoading(false);
  };

  // Table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User UPI",
      dataIndex: "upiId",
      key: "upiId",
    },
    {
      title: "Amount (₹)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "Pending" ? "red" : "green" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "Pending" ? (
          <Button type="primary" onClick={() => approvePayout(record.id)} loading={loading}>
            Approve
          </Button>
        ) : (
          <span style={{ color: "green" }}>Completed</span>
        ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Pending Payout Requests</Title>
      <Table dataSource={requests} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default Reviews;
