import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Fetching departments
const fetchDepartments = async () => {
  const { data } = await axios.get("/departments");
  return data;
};

const RegistrationForm = () => {
  const {
    data: departments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  const { TextArea } = Input;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching departments</p>;

  // Handle form submission
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.firstName);
    formData.append("surname", values.lastName);
    formData.append("department_id", values.department);

    // Append the avatar file (if any)
    if (values.avatar && values.avatar[0]) {
      formData.append("avatar", values.avatar[0].originFileObj);
    }

    try {
      const response = await axios.post(
        "https://momentum.redberryinternship.ge/api/employees", // Single endpoint for both upload and employee creation
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer 9e6a8d4d-4d40-4a42-a5fd-a4d8b8ff1e43`, // Replace with your token
          },
        }
      );
      console.log("Employee created:", response.data);
      // Handle success, show success message, or redirect
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        label="სახელი"
        name="firstName"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="გვარი"
        name="lastName"
        rules={[{ required: true, message: "Please input your surname!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Avatar"
        name="avatar"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Upload your profile picture"
      >
        <Upload listType="picture-card" className="w-full">
          <button
            style={{
              color: "inherit",
              cursor: "inherit",
              border: 0,
              background: "none",
              width: "100%",
            }}
            type="button"
          >
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="დეპარტამენტი"
        name="department"
        rules={[{ required: true, message: "Please select a department!" }]}
      >
        <Select>
          {departments.map((department) => (
            <Select.Option key={department.id} value={department.id}>
              {department.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Create Employee
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
