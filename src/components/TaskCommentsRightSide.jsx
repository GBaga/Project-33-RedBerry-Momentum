import React, { useState } from "react"; // Importing useState from 'react'
import { useMutation } from "@tanstack/react-query";
import { publicAxios } from "../config/axios";

// Function to post a new comment or reply
const postComment = async ({ taskId, text, parentId = null }) => {
  const token = import.meta.env.VITE_API_TOKEN;

  try {
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
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to post comment");
  }
};

const TaskCommentsRightSide = ({ comments, setComments, taskId }) => {
  const [commentText, setCommentText] = useState(""); // Now useState will work

  // Correct usage of useMutation
  const mutation = useMutation(postComment, {
    onSuccess: (newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentText(""); // Reset comment input
    },
    onError: (error) => {
      console.error("Error posting comment:", error);
    },
  });

  const handlePostComment = () => {
    if (commentText.trim()) {
      mutation.mutate({ taskId, text: commentText });
    }
  };

  return (
    <div>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        onClick={handlePostComment}
        disabled={mutation.isLoading || !commentText.trim()}
      >
        {mutation.isLoading ? "Posting..." : "Post Comment"}
      </button>
      {/* Render Comments */}
    </div>
  );
};

export default TaskCommentsRightSide;
