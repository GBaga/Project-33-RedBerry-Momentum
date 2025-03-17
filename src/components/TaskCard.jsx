import React from "react";
import { useNavigate } from "react-router-dom";

function TaskCard({
  id,
  name,
  description,
  dueDate,
  department,
  departmentId,
  employeeName,
  employeeAvatar,
  priority,
  priorityIcon,
  priorityId,
  statusId,
  totalComments,
}) {
  const navigate = useNavigate();

  if (!id) {
    console.error("Task ID is missing or invalid");
    return null;
  }

  const colors = {
    priority: {
      1: "#08A508",
      2: "#FFBE0B",
      3: "#FA4D4D",
    },
    status: {
      1: "#F7BC30",
      2: "#FB5607",
      3: "#FF006E",
      4: "#3A86FF",
      default: "#212529",
    },
    department: {
      1: "#6A77FD",
      2: "#FF66A8",
      3: "#4CC88D",
      4: "#FD9A6A",
      5: "#89B6FF",
      6: "#FFD86D",
      7: "#A27AFF",
      default: "#CCCCCC",
    },
  };

  const borderColor = colors.priority[priorityId] || "#CCCCCC";
  const statusColor = colors.status[statusId] || colors.status.default;
  const depColor = colors.department[departmentId] || colors.department.default;

  console.log("colors", departmentId, statusId, priorityId);

  const georgianMonths = [
    "იანვ",
    "თებ",
    "მარ",
    "აპრ",
    "მაი",
    "ივნ",
    "ივლ",
    "აგვ",
    "სექ",
    "ოქტ",
    "ნოე",
    "დეკ",
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = georgianMonths[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const handleCardClick = () => {
    navigate(`/tasks/${id}`);
  };

  return (
    <button
      onClick={handleCardClick}
      style={{ border: `1px solid ${statusColor}` }}
      className="w-full max-w-sm min-h-[240px]  p-6 bg-white border rounded-2xl shadow-sm mx-auto cursor-pointer  hover:scale-102   transition-all duration-300 ease-in-out"
    >
      <div className="flex justify-between items-center mb-7">
        <div className="w-[184px] flex items-center gap-2">
          <div
            style={{ border: `1px solid ${borderColor}` }}
            className="w-[86px] h-[26px] rounded-[4px] border-[0.5px] p-1 gap-[6px] flex items-center"
          >
            <img src={priorityIcon} alt={priority} className="w-3 h-[9px]" />
            <p
              style={{ color: borderColor }}
              className="text-[12px] leading-[150%]"
            >
              {priority}
            </p>
          </div>
          <div
            style={{ backgroundColor: depColor }}
            className="w-[88px] h-[24px] rounded-[15px] flex items-center justify-center px-2"
          >
            <p className="text-white text-[12px] truncate">{department}</p>
          </div>
        </div>
        <p className="text-sm">{formatDate(dueDate)}</p>
      </div>

      <h5 className="mb-3 text-[15px] font-bold text-gray-900 text-left truncate">
        {name}
      </h5>
      <p className="mb-7 text-[14px] text-[#343A40] text-left line-clamp-2">
        {description}
      </p>

      <div className="flex justify-between items-center">
        <img
          src={employeeAvatar}
          alt={employeeName}
          className="w-[31px] h-[31px] rounded-full"
        />
        <div className="flex gap-1 items-center">
          <img src="/assets/images/comments-icon.png" alt="comments-icon" />
          <p className="text-sm">{totalComments}</p>
        </div>
      </div>
    </button>
  );
}

export default TaskCard;
