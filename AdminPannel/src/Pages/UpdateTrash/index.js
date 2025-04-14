import React, { useState, useEffect } from "react";
import { Typography, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateTrash() {
  const { id } = useParams(); // Get trash ID from the URL
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Fetch existing trash details
  useEffect(() => {
    const fetchTrashDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/trashitem/${id}`);
        const trashData = response.data;
        form.setFieldsValue({
          name: trashData.name,
          price: trashData.price,
        });

        if (trashData.image) {
          setPreviewImage(trashData.image);
          setImage(trashData.image);
        }
      } catch (error) {
        console.error("Error fetching trash details:", error);
        message.error("Failed to load trash details.");
      }
    };

    fetchTrashDetails();
  }, [id, form]);

  // Handle image upload
  const handleImageUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreviewImage(reader.result);
      setImage(reader.result);
    };

    return false;
  };

  const onFinish = async (values) => {
    const REST_API_BASE_URL = `http://localhost:8080/api/trashitem/update/${id}`;

    const payload = {
      ...values,
      image: image,
    };

    try {
      await axios.put(REST_API_BASE_URL, payload);
      message.success("Trash updated successfully!");
      navigate(-1); // Navigate back
    } catch (error) {
      console.error("Error updating trash:", error);
      message.error("Failed to update trash. Please try again.");
    }
  };

  return (
    <div
      className="UpdateTrash"
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
          Update Trash Prices
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
              showUploadList={false}
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
              Update
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

export default UpdateTrash;
