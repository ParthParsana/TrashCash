import React, { useEffect, useState } from "react";
import { Table, Typography, Input } from "antd";
import axios from "axios";

const { Search } = Input;

function Users() {
  return (
    <div className="Users">
      <Typography.Title level={4}>Users</Typography.Title>
      <AllUser />
    </div>
  );
}

function AllUser() {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination settings
  const [pagination, setPagination] = useState({
    current: 1,  // Start from page 1
    pageSize: 6, // Show 6 rows per page
  });

  const fetchUsers = async () => {
    const REST_API_BASE_URL = "http://localhost:8080/api/auth/getemail";

    try {
      setLoading(true);
      const response = await axios.get(REST_API_BASE_URL);
      setDataSource(response.data); 
      setFilteredData(response.data); // Initialize filtered data
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSearch = (value) => {
    const searchValue = value.toLowerCase();
    const filtered = dataSource.filter((user) =>
      Object.values(user).some((field) =>
        String(field).toLowerCase().includes(searchValue)
      )
    );
    setFilteredData(filtered);
  };

  // Handle pagination change
  const handleTableChange = (pagination) => {
    setPagination(pagination); // Update the current page and page size
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (record1, record2) => record1.id - record2.id,
    },
    {
      title: "Email_Id",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <div>
      <Search
        placeholder="Search users"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ marginBottom: 20 }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id" // Ensure each row has a unique key
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

export default Users;
