import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "../../config/axios";
import "./modalForm.css";
import Loader from "../Loader";
import Swal from "sweetalert2";

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

    const token = import.meta.env.VITE_API_TOKEN;

    try {
      await publicAxios.post(
        "https://momentum.redberryinternship.ge/api/employees",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "მონაცემები წარმატებით შეინახა!",
        showConfirmButton: false,
        timer: 2000,
        background: "#F8F3FE",
        color: "#212529",
        customClass: {
          popup: "rounded-lg shadow-lg p-6",
          title: "text-[#212529] font-semibold text-lg",
        },
      });

      form.resetFields();
      setOpen(false);
    } catch (error) {
      console.error(
        "Error creating employee:",
        error.response?.data || error.message
      );
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "თანამშრომელი ვერ დაემატა. ხელახლა სცადეთ.",
        showConfirmButton: false,
        timer: 2000,
        background: "#F8F3FE",
        color: "#212529",
        customClass: {
          popup: "rounded-lg shadow-lg p-6",
          title: "text-[#212529] font-semibold text-lg",
        },
      });
    }
  };

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className=" h-10 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white md:text-black rounded-[5px] border border-purple-600 hover:border-purple-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 cursor-pointer transition-all duration-300 ease-in-out"
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
          <Loader />
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
