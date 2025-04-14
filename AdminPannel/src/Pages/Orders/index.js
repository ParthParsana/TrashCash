import React, { useEffect, useState } from "react";
import { Table, Typography, Input, Select, Button, notification } from "antd";
import axios from "axios";

const { Search } = Input;
const { Option } = Select;

function Orders() {
  return (
    <div className="Orders">
      <Typography.Title level={4}>Orders Management</Typography.Title>
      <AllOrders />
    </div>
  );
}

function AllOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

   // Pagination settings
    const [pagination, setPagination] = useState({
      current: 1,  // Start from page 1
      pageSize: 4, // Show 6 rows per page
    });

  const statusOptions = [
    "Pending",
    "Order Confirmed",
    "Out for Pick-up",
    "Order Completed",
  ];

  

  // Fetching order data from the server (API endpoint example)
  const fetchOrders = async () => {
    const REST_API_BASE_URL = "http://localhost:8080/api/orders/all"; // Replace with actual API URL

    try {
      setLoading(true);
      const response = await axios.get(REST_API_BASE_URL);
      setDataSource(response.data);
      setFilteredData(response.data); // Initialize filtered data
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle search input
  const onSearch = (value) => {
    const searchValue = value.toLowerCase();
    const filtered = dataSource.filter((order) =>
      Object.values(order).some((field) =>
        String(field).toLowerCase().includes(searchValue)
      )
    );
    setFilteredData(filtered);
  };

  const handleStatusChange = async (value, id) => {
    try {
      // Update the status locally
      const updatedData = dataSource.map((order) =>
        order.id === id ? { ...order, status: value } : order
      );
      setDataSource(updatedData);
  
      // Send the updated status to the backend
      const response = await axios.patch(`http://localhost:8080/api/orders/${id}/status`, null, {
        params: { newStatus: value },
      });
      
  
      if (response.status === 200) {
        notification.success({
          message: `Order ID ${id} status updated to ${value}`,
        });
      } else {
        notification.error({
          message: `Failed to update Order ID ${id} status.`,
        });
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      notification.error({
        message: "Failed to update order status. Please try again.",
      });
    }
  };
  

   // Handle pagination change
   const handleTableChange = (pagination) => {
    setPagination(pagination); // Update the current page and page size
  };

  // Columns for the orders table
  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 10 },
    { title: "Order ID", dataIndex: "orderId", key: "orderId", width: 40 },
    { title: "Name", dataIndex: "name", key: "name", width: 50 },
    { title: "Email", dataIndex: "email", key: "email", width: 180 },
    { title: "Mobile", dataIndex: "mobileNumber", key: "mobileNumber", width: 120 },
    { title: "Current Location", dataIndex: "currentLocation", key: "currentLocation", width: 150 },
    { title: "Weight", dataIndex: "weight", key: "weight", width: 80 },
    { title: "Order Date", dataIndex: "orderDate", key: "orderDate", width: 230 },
    { title: "Remarks", dataIndex: "remarks", key: "remarks", minWidth: 40 },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status, record) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleStatusChange(value, record.id)}
          style={{ width: 150 }} // Narrow select box
        >
          {statusOptions.map((statusOption, index) => (
            <Option key={index} value={statusOption}>
              {statusOption}
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  return (
    <div>
      <Search
        placeholder="Search orders"
        allowClear
        enterButton="Search"
        size="middle" // Small size for search bar
        onSearch={onSearch}
        style={{ marginBottom: 20, width: '300px' }} // Make search bar width smaller
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
         pagination={{
          current: pagination.current, // Current page
          pageSize: pagination.pageSize, // Rows per page
          total: filteredData.length, // Total number of items
          onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }), // Handle page change
        }} 
      />
    </div>
  );
}

export default Orders;
