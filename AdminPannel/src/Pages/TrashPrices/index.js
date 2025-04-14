import React, { useEffect, useState } from "react";
import { Table, Typography, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

function TrashPrices() {
  return (
    <div className="TrashPrices">
      <Typography.Title level={4}>Trash Items</Typography.Title>
      <AllTrash />
    </div>
  );
}

function AllTrash() {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination settings
    const [pagination, setPagination] = useState({
      current: 1,  // Start from page 1
      pageSize: 4, // Show 6 rows per page
    });

  const fetchTrashPrices = async () => {
    const REST_API_BASE_URL = "http://localhost:8080/api/trashitem/all";

    try {
      setLoading(true);
      const response = await axios.get(REST_API_BASE_URL);
      setDataSource(response.data);
      setFilteredData(response.data); // Initialize filtered data
    } catch (error) {
      console.error("Error fetching trash:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrashPrices();
  }, []);

 
  
  const onSearch = (value) => {
    const searchValue = value.trim().toLowerCase();
  
    if (!searchValue) {
      setFilteredData(dataSource); // Reset if empty search
      return;
    }
  
    console.log("Search Value:", searchValue);
  
    const filtered = dataSource.filter((user) =>
      Object.values(user).some((field) =>
        field ? String(field).toLowerCase().includes(searchValue) : false
      )
    );
  
    setFilteredData(filtered);
    console.log("Filtered Data:", filtered);
  };
  
  
  

  const navigate = useNavigate();
  const handleAddTrash = () => {
    navigate("/AddTrash");
  };

  const handleUpdate = (record) => {
    navigate(`/UpdateTrash/${record.id}`, { state: { record } });
  };

  const handleDelete = async (record) => {
    const REST_API_BASE_URL = `http://localhost:8080/api/trashitem/delete/${record.id}`;
    try {
      await axios.delete(REST_API_BASE_URL);
      message.success("Trash deleted successfully!");
      fetchTrashPrices(); // Re-fetch data after deletion
    } catch (error) {
      console.error("Error deleting trash:", error);
      message.error("Failed to delete trash. Please try again.");
    }
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
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image) =>
      image ? (
        <img
          src={image}
          alt="Trash"
          style={{ width: "50px", height: "50px", borderRadius: "5px" }}
        />
      ) : (
        "No Image"
      ),
  },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>
          <Button
            type="primary"
            onClick={() => handleDelete(record)}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Search
        placeholder="Search trash"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ marginBottom: 20 }}
      />

      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={handleAddTrash}
      >
        Add Trash
      </Button>

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

export default TrashPrices;
