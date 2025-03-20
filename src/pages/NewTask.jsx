import { useForm, Controller } from "react-hook-form"; // Import Controller
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchStatuses,
  fetchEmployees,
  fetchDepartments,
  fetchPriorities,
} from "../config/api";
import { publicAxios } from "../config/axios";
import Loader from "../components/Loader";
import BtnCreateNew from "../components/button/BtnCreateNew";
import ReactSelect from "react-select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { addDays } from "date-fns";
import ka from "date-fns/locale/ka";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

registerLocale("ka", ka);

const NewTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      priority: 2,
      status: 1,
    },
  });

  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (newTask) => publicAxios.post("/tasks", newTask),
    onSuccess: () => {
      reset({
        title: "",
        description: "",
        priority: null,
        status: "",
        department: "",
        responsiblePerson: "",
        deadline: "",
      });
      setValue("priority", null);
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
      }).then(() => {
        navigate("/");
      });
    },
    onError: (error) => {
      if (error.response) {
        console.error("Error creating task:", error.response.data);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `მონაცემები ვერ შეინახა: ${error.response.data.message}`,
          showConfirmButton: false,
          timer: 2000,
          background: "#F8F3FE",
          color: "#212529",
          customClass: {
            popup: "rounded-lg shadow-lg p-6",
            title: "text-[#212529] font-semibold text-lg",
          },
        });
      } else {
        console.error("Error creating task:", error.message);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "მონაცემები ვერ შეინახა. ხელახლა სცადეთ.",
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
    },
  });

  const { data: statuses, isLoading: loadingStatuses } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  const { data: employees, isLoading: loadingEmployees } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const { data: departments, isLoading: loadingDepartments } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  const { data: priorities, isLoading: loadingPriorities } = useQuery({
    queryKey: ["priorities"],
    queryFn: fetchPriorities,
  });

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const tomorrow = addDays(new Date(), 1);

  const filteredEmployees = selectedDepartment
    ? employees.filter(
        (employee) => employee.department.id === selectedDepartment
      )
    : employees;

  const onSubmit = (data) => {
    mutation.mutate({
      name: data.title,
      description: data.description,
      due_date: data.deadline,
      status_id: parseInt(data.status, 10),
      employee_id: parseInt(data.responsiblePerson, 10),
      priority_id: parseInt(data.priority, 10), // Send the priority value
      department_id: parseInt(data.department, 10),
    });

    console.log("Parsed Values:", {
      status_id: parseInt(data.status, 10),
      employee_id: parseInt(data.responsiblePerson, 10),
      priority_id: parseInt(data.priority, 10),
      department_id: parseInt(data.department, 10),
    });
  };

  if (
    loadingStatuses ||
    loadingEmployees ||
    loadingDepartments ||
    loadingPriorities
  ) {
    return <Loader />;
  }

  const optionsPriorities = priorities.map((priority) => ({
    value: priority.id,
    label: (
      <div className="flex items-center">
        <img src={priority.icon} alt={priority.name} className="mr-2" />
        {priority.name}
      </div>
    ),
  }));

  const optionsStatuses = statuses.map((status) => ({
    value: status.id,
    label: status.name,
  }));

  const optionsDepartments = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  const optionsEmployees = filteredEmployees.map((employee) => ({
    value: employee.id,
    label: (
      <div className="flex items-center">
        {employee.avatar ? (
          <img
            src={employee.avatar}
            alt={employee.name}
            className="mr-2 w-8 h-8 rounded-full"
          />
        ) : (
          <div className="mr-2 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-sm text-white">
              {employee.name.charAt(0)}
              {employee.surname.charAt(0)}
            </span>
          </div>
        )}
        {employee.name} {employee.surname}
      </div>
    ),
  }));

  return (
    <div className="max-w-[1920px] w-full min-h-[calc(100vh-300px-224px)] mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="mb-6 font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight">
        შექმენი ახალი დავალება
      </h2>
      <div className="max-w-[1920px] w-full min-h-[calc(100vh-300px-224px)] rounded-[4px] border-[#ddd2ff70] border-[0.3px] bg-[#FBF9FFA6] py-[65px] px-[55px] ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-[#343A40] font-normal text-[16px] leading-[100%] tracking-[0%] mb-1.5">
                  სათაური *
                </label>
                <input
                  {...register("title", {
                    required: "სათაური აუცილებელია",
                    minLength: {
                      value: 3,
                      message: "მინიმუმ 3 სიმბოლო",
                    },
                    maxLength: {
                      value: 255,
                      message: "მაქსიმუმ 255 სიმბოლო",
                    },
                  })}
                  onFocus={() => setIsTitleFocused(true)}
                  className="max-w-[550px] w-full min-h-[45px] rounded-[5px] border focus:border-[2px] border-[#DEE2E6] bg-[#FFFFFF] px-3 py-1.5 gap-[10px] focus:border-blue-400 focus:outline-none"
                />
                {isTitleFocused && (
                  <>
                    <p
                      className={`text-sm ${
                        errors.title?.type === "minLength" ||
                        errors.title?.type === "required" ||
                        watch("title").length < 3
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      მინიმუმ 3 სიმბოლო
                    </p>
                    <p
                      className={`text-sm ${
                        errors.title?.type === "maxLength" ||
                        watch("title").length > 255
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      მაქსიმუმ 255 სიმბოლო
                    </p>
                    {errors.title && errors.title.type === "required" && (
                      <p className="text-red-500 text-sm">
                        {errors.title.message}
                      </p>
                    )}
                  </>
                )}
              </div>
              <div>
                <label className="block text-[#343A40] font-normal text-4 leading-[100%] tracking-[0%] mb-1.5">
                  აღწერა
                </label>
                <textarea
                  {...register("description", {
                    validate: {
                      minWords: (value) =>
                        value.split(" ").filter(Boolean).length >= 4 ||
                        "მინიმუმ 4 სიტყვა",
                      maxLength: (value) =>
                        value.length <= 255 || "მაქსიმუმ 255 სიმბოლო",
                    },
                  })}
                  onFocus={() => setIsDescriptionFocused(true)}
                  className="max-w-[550px] w-full min-h-[133px] rounded-[5px] border focus:border-[2px] border-[#DEE2E6] bg-[#FFFFFF] p-[14px] gap-[10px] focus:border-blue-400 focus:outline-none"
                />
                {isDescriptionFocused && watch("description") && (
                  <>
                    <p
                      className={`text-sm ${
                        watch("description").split(" ").filter(Boolean).length <
                        4
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      მინიმუმ 4 სიტყვა
                    </p>
                    <p
                      className={`text-sm ${
                        watch("description").length > 255
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      მაქსიმუმ 255 სიმბოლო
                    </p>
                  </>
                )}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#343A40] font-normal text-[16px] leading-[100%] tracking-[0%] mb-1.5">
                    პრიორიტეტი *
                  </label>
                  <Controller
                    name="priority"
                    control={control}
                    rules={{ required: "აირჩიეთ პრიორიტეტი" }}
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        options={optionsPriorities}
                        value={
                          optionsPriorities.find(
                            (option) => option.value === field.value
                          ) || null
                        }
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        placeholder="აირჩიეთ პრიორიტეტი"
                        className="w-full"
                      />
                    )}
                  />
                  {errors.priority && (
                    <p className="text-red-500 text-sm">
                      {errors.priority.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[#343A40] font-normal text-[16px] leading-[100%] tracking-[0%] mb-1.5">
                    სტატუსი *
                  </label>
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: "აირჩიეთ სტატუსი" }}
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        options={optionsStatuses}
                        value={
                          optionsStatuses.find(
                            (option) => option.value === field.value
                          ) || null
                        }
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        placeholder="აირჩიეთ სტატუსი"
                        className="w-full"
                      />
                    )}
                  />
                  {errors.status && (
                    <p className="text-red-500 text-sm">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-[#343A40] font-normal text-[16px] leading-[100%] tracking-[0%] mb-1.5">
                  დეპარტამენტი *
                </label>
                <Controller
                  name="department"
                  control={control}
                  rules={{ required: "აირჩიეთ დეპარტამენტი" }}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      options={optionsDepartments}
                      value={
                        optionsDepartments.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                      onChange={(selectedOption) => {
                        setSelectedDepartment(selectedOption?.value);
                        field.onChange(selectedOption?.value);
                      }}
                      placeholder="აირჩიეთ დეპარტამენტი"
                      className="w-full"
                    />
                  )}
                />
                {errors.department && (
                  <p className="text-red-500 text-sm">
                    {errors.department.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#343A40] font-normal text-[16px] leading-[100%] tracking-[0%] mb-1.5">
                  პასუხისმგებელი პირი *
                </label>
                <Controller
                  name="responsiblePerson"
                  control={control}
                  rules={{ required: "აირჩიეთ პასუხისმგებელი პირი" }}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      options={optionsEmployees}
                      value={
                        optionsEmployees.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption?.value);
                      }}
                      placeholder="აირჩიეთ პასუხისმგებელი პირი"
                      className="w-full"
                      isDisabled={!selectedDepartment}
                    />
                  )}
                />
                {errors.responsiblePerson && (
                  <p className="text-red-500 text-sm">
                    {errors.responsiblePerson.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[#343A40] font-normal text-[16px] leading-[100%] tracking-[0%] mb-1.5">
                  დედლაინი *
                </label>
                <Controller
                  styles={{ width: "100%" }}
                  name="deadline"
                  control={control}
                  rules={{
                    required: "აირჩიეთ დედლაინი",
                    validate: (value) =>
                      new Date(value) >= new Date() ||
                      "წარსული თარიღი არ არის დაშვებული",
                  }}
                  render={({ field }) => (
                    <ReactDatePicker
                      {...field}
                      selected={field.value || tomorrow}
                      onChange={(date) => field.onChange(date)}
                      locale="ka"
                      dateFormat="dd-MM-yyyy"
                      minDate={new Date()}
                      className="w-full p-2 border border-gray-300 rounded focus:border-[2px] focus:border-blue-400 focus:outline-none cursor-pointer"
                    />
                  )}
                />
                {errors.deadline && (
                  <p className="text-red-500 text-sm">
                    {errors.deadline.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <BtnCreateNew title="დავალების შექმნა" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
