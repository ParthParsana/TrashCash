import React, { useState } from "react";
import { Typography, Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

function Reviews() {
  return (
    <div className="TrashPrices">
      <AdTrash />
    </div>
  );
}

function AdTrash() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Handle image upload
  const handleImageUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert file to Base64

    reader.onload = () => {
      setPreviewImage(reader.result); // Preview Image
      setImage(reader.result); // Store Base64 Image
    };

    return false; // Prevent default upload behavior
  };

  const onFinish = async (values) => {
    const REST_API_BASE_URL = "http://localhost:8080/api/trashitem/add";

    const payload = {
      ...values,
      image: image, // Add Base64 image to the payload
    };

    try {
      await axios.post(REST_API_BASE_URL, payload);
      message.success("Trash added successfully!");
      navigate(-1); // Navigate back
    } catch (error) {
      console.error("Error adding trash:", error);
      message.error("Failed to add trash. Please try again.");
    }
  };

  return (
    <div
      className="AddTrash"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "400px",
        height: "80vh",
      }}
    >
      <div
        style={{
          width: 300,
          padding: 20,
          border: "1px solid #d9d9d9",
          borderRadius: 8,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography.Title level={4} style={{ textAlign: "center" }}>
          Add Trash Prices
        </Typography.Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name!" }]}
          >
            <Input placeholder="Enter trash name" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price!" }]}
          >
            <Input placeholder="Enter price per kg" type="number" />
          </Form.Item>
          <Form.Item label="Upload Image" name="image">
            <Upload
              beforeUpload={handleImageUpload}
              showUploadList={false} // Hide default upload list
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          {/* Preview Uploaded Image */}
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ width: "30%", marginTop: 10, borderRadius: 8 }}
            />
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="link"
          style={{ marginTop: 10 }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default Reviews;
