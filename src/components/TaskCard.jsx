import React from "react";
import { useNavigate } from "react-router-dom";

function TaskCard({
  id, // Task ID
  // commentId, // Comment ID
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

  // Ensure `id` is a valid number or string before attempting to navigate
  if (!id) {
    console.error("Task ID is missing or invalid");
    return null; // Don't render the card if `id` is invalid
  }

  // Ensure commentId exists or set to "default"
  // const finalCommentId = commentId ? commentId : "default";

  const borderColor =
    priorityId === 1 ? "#08A508" : priorityId === 2 ? "#FFBE0B" : "#FA4D4D";

  const statusColor =
    statusId === 1
      ? "#F7BC30"
      : statusId === 2
      ? "#FB5607"
      : statusId === 3
      ? "#FF006E"
      : statusId === 4
      ? "#3A86FF"
      : "#212529";

  const depColor =
    departmentId === 1
      ? "#6A77FD"
      : departmentId === 2
      ? "#FF66A8"
      : departmentId === 3
      ? "#4CC88D"
      : departmentId === 4
      ? "#FD9A6A"
      : departmentId === 5
      ? "#89B6FF"
      : departmentId === 6
      ? "#FFD86D"
      : departmentId === 7
      ? "#A27AFF"
      : "#CCCCCC";

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

  // Function to navigate to task details page
  const handleCardClick = () => {
    // If ID is missing, return early
    if (!id) {
      console.error("Task ID is missing or invalid");
      return;
    }

    // Debugging log to check values
    console.log("Task ID:", id);
    // console.log("Comment ID:", finalCommentId);

    // Navigate to the task details page with both taskId and commentId
    navigate(`/tasks/${id}`);
  };

  return (
    <button
      onClick={handleCardClick}
      style={{ border: `1px solid ${statusColor}` }}
      className="w-full max-w-sm p-6 bg-white border rounded-2xl shadow-sm mx-auto cursor-pointer hover:scale-102 transition-all duration-300 ease-in-out"
    >
      <div className="flex justify-between items-center mb-7">
        <div className="w-[184px] flex items-center gap-2">
          <div
            style={{ border: `1px solid ${borderColor}` }}
            className="w-[86px] h-[26px] rounded-[4px] border-[0.5px] p-1 gap-[6px] flex items-center"
          >
            <img src={priorityIcon} alt={priority} className="w-3 h-[9px]" />
            <p
              style={{ color: `${borderColor}` }}
              className="text-[12px] leading-[150%]"
            >
              {priority}
            </p>
          </div>
          <div
            style={{ backgroundColor: `${depColor}` }}
            className="w-[88px] h-[24px] rounded-[15px] gap-[10px] pt-[5px] pr-[9px] pb-[5px] pl-[9px]"
          >
            <p className="text-white font-normal text-[12px] leading-[100%] tracking-[0%] truncate">
              {department}
            </p>
          </div>
        </div>
        <p className="text-sm">{formatDate(dueDate)}</p>
      </div>

      <h5 className="mb-3 text-[15px] font-bold tracking-tight text-gray-900 text-left">
        {name}
      </h5>
      <p className="mb-7 font-normal text-[14px] text-[#343A40] text-left">
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
