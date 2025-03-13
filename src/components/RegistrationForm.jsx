import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchDepartments = async () => {
  const { data } = await axios.get("/departments");
  return Array.isArray(data) ? data : data.departments || []; // Ensure it's an array
};

const RegistrationForm = () => {
  const {
    data: departments = [],
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

    if (values.avatar && values.avatar[0]) {
      formData.append("avatar", values.avatar[0].originFileObj);
    }

    try {
      const response = await axios.post(
        "https://momentum.redberryinternship.ge/api/employees",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer 9e6a8d4d-4d40-4a42-a5fd-a4d8b8ff1e43`,
          },
        }
      );
      console.log("Employee created:", response.data);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

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
            <div style={{ marginTop: 8 }}>Upload</div>
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

const BtnCreateNew = () => {
  return (
    <button
      className="w-[268px] h-[40px] rounded-[5px] px-5 py-2 bg-blue-600 text-white font-medium 
                 flex items-center justify-center gap-1 transition-all duration-300 ease-out 
                 hover:bg-blue-700 hover:shadow-lg active:scale-95"
    >
      + შექმენი ახალი დავალება
    </button>
  );
};

export default RegistrationForm;
