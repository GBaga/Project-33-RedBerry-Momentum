import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, Upload } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchDepartments, createEmployee } from "../../config/api";
import "./modalForm.css";
import Loader from "../Loader";
import Swal from "sweetalert2";
import CustomIcon from "/assets/images/gallery-export-icon.png";

const ModalForm = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

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
      await createEmployee(formData);
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
      setFileList([]);
      setOpen(false);
    } catch (error) {
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

  const normFile = (e) => {
    const fileList = Array.isArray(e) ? e : e?.fileList;
    setFileList(fileList);
    return fileList;
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-10 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white md:text-black rounded-[5px] border border-purple-600 hover:border-purple-300 cursor-pointer transition-all duration-300 ease-in-out"
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
        width="90%"
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
            <div className="flex flex-col md:flex-row w-full justify-between gap-4">
              <Form.Item
                className="w-full"
                label="სახელი"
                name="firstName"
                rules={[{ required: true, message: "შეიყვანეთ სახელი!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="w-full"
                label="გვარი"
                name="lastName"
                rules={[{ required: true, message: "შეიყვანეთ გვარი!" }]}
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
                maxCount={1}
                fileList={fileList}
                onChange={handleChange}
              >
                {fileList.length === 0 && (
                  <div>
                    <img
                      src={CustomIcon}
                      alt="Upload"
                      style={{ width: 24, height: 24, margin: "auto" }}
                    />
                    <div style={{ marginTop: 8 }}>ატვირთე ფოტო</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              label="დეპარტამენტი"
              name="department"
              rules={[{ required: true, message: "აირჩიეთ დეპარტამენტი!" }]}
            >
              <Select className="w-full md:max-w-[50%]">
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
