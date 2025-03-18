import { React, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { publicAxios } from "../config/axios";
import axios from "axios"; // Import axios
import Loader from "../components/Loader";

const fetchTaskDetails = async (taskId) => {
  const response = await publicAxios.get(`/tasks/${taskId}`);
  return response.data;
};

const fetchStatuses = async () => {
  const { data } = await publicAxios.get("/statuses");
  return data;
};

const fetchComments = async (taskId) => {
  const response = await publicAxios.get(`/tasks/${taskId}/comments`);
  return response.data;
};

const postComment = async ({ taskId, text, parentId = null }) => {
  const token = import.meta.env.VITE_API_TOKEN;
  const response = await publicAxios.post(
    `/tasks/${taskId}/comments`,
    { text, parent_id: parentId },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token?.trim()}`,
      },
    }
  );
  return response.data;
};

const countTotalComments = (comments) => {
  let total = comments.length;
  comments.forEach((comment) => {
    if (comment.sub_comments && comment.sub_comments.length > 0) {
      total += countTotalComments(comment.sub_comments); // Recursively count sub-comments
    }
  });
  return total;
};

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState({});
  const {
    data: task,
    isLoading: isTaskLoading,
    isError: isTaskError,
  } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => fetchTaskDetails(taskId),
    enabled: !!taskId,
  });
  const {
    data: statuses,
    isLoading: isStatusesLoading,
    isError: isStatusesError,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });
  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ["taskComments", taskId],
    queryFn: () => fetchComments(taskId),
    enabled: !!taskId,
  });
  const commentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["taskComments", taskId]);
      setCommentText("");
      setReplyingTo(null);
      setReplyText({});
    },
  });

  const handleReply = (parentId) => {
    setReplyingTo(parentId);
    setReplyText((prev) => ({ ...prev, [parentId]: "" }));
  };

  const handleReplySubmit = (parentId) => {
    if (!replyText[parentId]?.trim()) return;
    commentMutation.mutate(
      { taskId, text: replyText[parentId], parentId },
      {
        onSuccess: () => {
          setReplyText((prev) => ({ ...prev, [parentId]: "" }));
          setReplyingTo(null);
        },
      }
    );
  };

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatusId) => {
      const token = import.meta.env.VITE_API_TOKEN; // Define token here
      const response = await axios.put(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
        { status_id: newStatusId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Manually update the cache with the new status
      queryClient.setQueryData(["task", taskId], (oldData) => ({
        ...oldData,
        status: {
          id: data.status.id,
          name: data.status.name,
        },
      }));
      // Re-fetch the task to ensure the latest data is loaded
      queryClient.invalidateQueries(["task", taskId]);
    },
  });

  const handleStatusChange = (event) => {
    const newStatusId = Number(event.target.value);
    updateStatusMutation.mutate(newStatusId);
  };

  if (isTaskLoading || isStatusesLoading) return <Loader />;
  if (isTaskError || isStatusesError) return <p>Error loading task details</p>;

  const renderComments = (comments) => {
    const reversedComments = [...comments].reverse();
    return reversedComments.map((comment) => (
      <div key={comment.id} className="space-y-2 mb-6 rounded-lg ">
        <div className="flex items-start space-x-4">
          <img
            src={comment.author_avatar}
            alt={comment.author_nickname || "Employee"}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div className="flex-1 ">
            <p className="mb-2 text-[#212529] font-medium text-[18px] leading-[100%] tracking-[0%]">
              {comment.author_nickname || "Employee"}
            </p>
            <p className="text-[#343A40] font-[350] text-[16px] leading-[100%] tracking-[0%]">
              {comment.text}
            </p>
            {!comment.parent_id && (
              <button
                onClick={() => handleReply(comment.id)}
                className=" text-[#8338EC] font-normal text-[12px] leading-[100%] tracking-[0%] flex items-center mt-4 mb-6"
              >
                <img
                  src="/assets/images/arrow-left-icon.png"
                  alt="arrow-icon"
                  className="mr-1.5"
                />
                უპასუხე
              </button>
            )}
            {replyingTo === comment.id && (
              <div className="relative mt-2 mb-5">
                <textarea
                  value={replyText[comment.id] || ""}
                  onChange={(e) =>
                    setReplyText({ ...replyText, [comment.id]: e.target.value })
                  }
                  placeholder="უპასუხე..."
                  className="w-full h-32 relative p-4 border bg-white border-gray-300 rounded-lg"
                ></textarea>
                <button
                  onClick={() => handleReplySubmit(comment.id)}
                  disabled={!replyText[comment.id]?.trim()}
                  className="w-fit h-fit px-5 absolute bottom-4 right-5 rounded-[20px] bg-[#8338EC] text-white p-2 hover:bg-[#B588F4]"
                >
                  პასუხის დამატება
                </button>
              </div>
            )}
            {comment.sub_comments && comment.sub_comments.length > 0 && (
              <div className="">
                {comment.sub_comments.map((subComment) => (
                  <div
                    key={subComment.id}
                    className="space-y-2 mb-5 rounded-lg bg-opacity "
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={subComment.author_avatar}
                        alt={subComment.author_nickname || "Employee"}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <p className="mb-2 text-[#212529] font-medium text-[18px] leading-[100%] tracking-[0%]">
                          {subComment.author_nickname || "Employee"}
                        </p>
                        <div className="flex-1">
                          <p className="text-[#343A40] font-[350] text-[16px] leading-[100%] tracking-[0%]">
                            {subComment.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  const borderColor =
    task.priority.id === 1
      ? "#08A508"
      : task.priority.id === 2
      ? "#FFBE0B"
      : "#FA4D4D";
  const depColor =
    task.department.id === 1
      ? "#6A77FD"
      : task.department.id === 2
      ? "#FF66A8"
      : task.department.id === 3
      ? "#4CC88D"
      : task.department.id === 4
      ? "#FD9A6A"
      : task.department.id === 5
      ? "#89B6FF"
      : task.department.id === 6
      ? "#FFD86D"
      : task.department.id === 7
      ? "#A27AFF"
      : "#CCCCCC";
  const totalComments = countTotalComments(comments);

  return (
    <div className="flex flex-col lg:flex-row space-y-8 lg:space-x-8 p-8">
      <div className="min-w-1/2 flex-1 space-y-6 mb-30">
        <div className="flex justify-between items-center mb-7">
          <div className="w-52 flex items-center gap-2">
            <div
              style={{ border: `1px solid ${borderColor}` }}
              className="w-[106px] h-[26px] rounded-[4px] border-[0.5px] p-1 gap-[6px] flex items-center"
            >
              <img
                src={task.priority.icon}
                alt={task.priority}
                className="w-[18px] h-5"
              />
              <p
                style={{ color: `${borderColor}` }}
                className="text-4 leading-[150%]"
              >
                {task.priority.name}
              </p>
            </div>
            <div
              style={{ backgroundColor: `${depColor}` }}
              className="w-[88px] h-[29px] rounded-[15px] gap-[10px] pt-[5px] pr-[9px] pb-[5px] pl-[9px]"
            >
              <p className="text-white font-normal text-4 leading-[100%] tracking-[0%] truncate">
                {task.department.name}
              </p>
            </div>
          </div>
        </div>

        <h2 className="font-semibold text-[34px] leading-[100%] tracking-normal text-[#212529] mb-9">
          {task.name}
        </h2>
        <p className="text-gray-600 mb-18">{task.description}</p>
        <h3 className="text-xl font-semibold text-gray-800">
          დავალების დეტალები
        </h3>
        {/* Status Dropdown */}
        <div className="flex max-w-lg">
          <div className="flex w-1/2">
            <img
              src="/assets/images/pie-chart-icon.png"
              alt="pie-chart-icon"
              className="w-6 h-6 mr-1"
            />
            <p className="text-gray-600">სტატუსი: </p>
          </div>
          <select
            className="w-[259px] h-[45px] gap-[10px] rounded-[5px] border border-[#CED4DA] p-[14px] text-[14px] font-light leading-none text-[#0d0f1093]"
            value={task.status?.id || ""}
            onChange={handleStatusChange}
          >
            {statuses.map((status) => (
              <option
                key={status.id}
                value={status.id}
                // className="text-[14px] font-light leading-none text-[#0D0F10]"
              >
                {status.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex max-w-lg">
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
            <div className="w-fit">
              <p className="font-light text-xs leading-none tracking-normal text-[#474747]">
                {task.department.name || "N/A"}
              </p>

              <p className="text-[#0D0F10] font-normal text-[14px] leading-[150%] tracking-normal">
                {task.employee?.name || "N/A"} {task.employee?.surname || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex max-w-lg">
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

      <div className="min-w-1/2  bg-[#F8F3FEA6] bg-opacity-65 p-6 rounded-lg py-11 px-10">
        <div className="relative">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="დაწერე კომენტარი..."
            className="w-full  h-32 relative p-4 border bg-white border-gray-300 rounded-lg"
          ></textarea>
          <button
            onClick={() =>
              commentMutation.mutate({ taskId, text: commentText })
            }
            disabled={!commentText.trim()}
            className="w-38 h-fit px-5 absolute bottom-4 right-5 rounded-[20px] bg-[#8338EC] text-white p-2  hover:bg-[#B588F4]"
          >
            დააკომენტარე
          </button>
        </div>

        <div className="flex gap-x-2 items-center mt-16 mb-10">
          <h3 className="font-medium text-lg leading-tight tracking-tight">
            კომენტარები
          </h3>
          <span className="w-[30px] h-[22px] gap-[10px] py-[2.5px] px rounded-[30px] text-center bg-[#8338EC] font-medium text-sm leading-tight tracking-tight text-white">
            {totalComments}
          </span>
        </div>
        <div className="space-y-4">
          {commentsLoading ? <Loader /> : renderComments(comments)}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
