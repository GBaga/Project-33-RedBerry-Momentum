// TaskDetailsLeftSide.js
import React from "react";

const TaskDetailsLeftSide = ({ task, borderColor, depColor }) => {
  return (
    <div className="min-w-1/2 flex-1 space-y-6 mb-30">
      <div className="flex justify-between items-center mb-7">
        <div className="w-[184px] flex items-center gap-2">
          <div
            style={{ border: `1px solid ${borderColor}` }}
            className="w-[86px] h-[26px] rounded-[4px] border-[0.5px] p-1 gap-[6px] flex items-center"
          >
            <img
              src={task.priority.icon}
              alt={task.priority}
              className="w-3 h-[9px]"
            />
            <p
              style={{ color: `${borderColor}` }}
              className="text-[12px] leading-[150%]"
            >
              {task.priority.name}
            </p>
          </div>
          <div
            style={{ backgroundColor: `${depColor}` }}
            className="w-[88px] h-[24px] rounded-[15px] gap-[10px] pt-[5px] pr-[9px] pb-[5px] pl-[9px]"
          >
            <p className="text-white font-normal text-[12px] leading-[100%] tracking-[0%] truncate">
              {task.department.name}
            </p>
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-[34px] leading-[100%] tracking-normal text-[#212529]">
        {task.name}
      </h2>
      <p className="text-gray-600">{task.description}</p>
      <h3 className="text-xl font-semibold text-gray-800">
        დავალების დეტალები
      </h3>
      {/* Status Dropdown */}
      <div className="flex max-w-md">
        <div className="flex w-1/2">
          <img
            src="/assets/images/pie-chart-icon.png"
            alt="pie-chart-icon"
            className="w-6 h-6 mr-1"
          />
          <p className="text-gray-600">სტატუსი: </p>
        </div>
        <p className="text-gray-600">{task.status?.name || "N/A"}</p>
      </div>

      <div className="flex max-w-md">
        <div className="flex w-1/2">
          <img
            src="/assets/images/user-icon.png"
            alt="pie-chart-icon"
            className="w-6 h-6 mr-1"
          />
          <p className="text-gray-600">თანამშრომელი: </p>
        </div>
        <div className="flex items-center">
          {task.employee?.avatar && (
            <img
              src={task.employee.avatar}
              alt={`${task.employee.name}'s avatar`}
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <div>
            <p className="text-gray-600 text-[11px] font-light leading-none tracking-normal">
              {task.department.name || "N/A"}
            </p>
            <p className="text-gray-600 font-normal text-sm leading-[150%] tracking-normal">
              {task.employee?.name || "N/A"} {task.employee?.surname || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex max-w-md">
        <div className="flex w-1/2">
          <img
            src="/assets/images/calendar-icon.png"
            alt="calendar-icon"
            className="w-6 h-6 mr-1"
          />
          <p className="text-gray-600">დავალების ვადა: </p>
        </div>
        <p className="text-gray-600">
          {new Date(task.due_date).toLocaleDateString() || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default TaskDetailsLeftSide;
