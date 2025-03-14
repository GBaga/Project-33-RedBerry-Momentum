import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "../config/axios";
import "./modalForm.css";

const fetchDepartments = async () => {
  const { data } = await publicAxios.get("/departments");
  return data;
};

const ModalForm = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const {
    data: departments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  const onFinish = async (values) => {
    console.log("Form Values:", values);
    const formData = new FormData();
    formData.append("name", values.firstName.trim());
    formData.append("surname", values.lastName.trim());
    formData.append("department_id", values.department);

    if (values.avatar && values.avatar[0]?.originFileObj) {
      formData.append("avatar", values.avatar[0].originFileObj);
    }

    try {
      const response = await publicAxios.post(
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
      form.resetFields();
      setOpen(false);
    } catch (error) {
      console.error(
        "Error creating employee:",
        error.response?.data || error.message
      );
    }
  };

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-[268px] h-[40px] rounded-[5px] px-5 py-2 bg-blue-600 text-white font-medium 
                   flex items-center justify-center gap-1 transition-all duration-300 ease-out 
                   hover:bg-blue-700 hover:shadow-lg active:scale-95"
      >
        თანამშრომლის შექმნა
      </button>

      <Modal
        title={
          <span
            style={{
              fontSize: "32px",
              fontWeight: "500",
              color: "#212529",
              textAlign: "center",
              display: "block",
              width: "100%",
            }}
          >
            თანამშრომლის დამატება
          </span>
        }
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width="50%"
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            გაუქმება
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            დაამატე თანამშრომელი
          </Button>,
        ]}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching departments</p>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="w-full"
          >
            <div className="flex w-full justify-between gap-4">
              <Form.Item
                className="w-full"
                label="სახელი"
                name="firstName"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="w-full"
                label="გვარი"
                name="lastName"
                rules={[
                  { required: true, message: "Please input your surname!" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <Form.Item
              label="ავატარი"
              name="avatar"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                className="custom-upload w-full"
                listType="picture-card"
                beforeUpload={() => false}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item
              label="დეპარტამენტი"
              name="department"
              rules={[
                { required: true, message: "Please select a department!" },
              ]}
            >
              <Select className="max-w-[50%]">
                {departments.map((d) => (
                  <Select.Option key={d.id} value={d.id}>
                    {d.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default ModalForm;
