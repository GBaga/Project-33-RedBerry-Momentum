import { BrowserRouter, Routes, Route } from "react-router-dom"; // Correct import for react-router-dom
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./components/layouts/MainLayout.jsx";
import NewTask from "./pages/NewTask.jsx";
import TaskDetailsPage from "./pages/TaskDetailsPage.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/new-task" element={<NewTask />} />
            <Route path="/tasks/:taskId" element={<TaskDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
