import React, { useState } from "react";
import { Flex, Modal } from "antd";

const ModalWindow = () => {
  const [openResponsive, setOpenResponsive] = useState(false);
  return (
    <Flex vertical gap="middle" align="flex-start">
      <button
        type="primary"
        onClick={() => setOpenResponsive(true)}
        className="w-[268px] h-[40px] rounded-[5px] px-5 py-2 bg-blue-600 text-white font-medium 
                         flex items-center justify-center gap-1 transition-all duration-300 ease-out 
                         hover:bg-blue-700 hover:shadow-lg active:scale-95"
      >
        ახალი თანამშრომელი
      </button>

      <Modal
        title="Modal responsive width"
        centered
        open={openResponsive}
        onOk={() => setOpenResponsive(false)}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <p>some contents...</p>
        <p>some contents...</p>

        <p>some contents...</p>
      </Modal>
    </Flex>
  );
};
export default ModalWindow;
