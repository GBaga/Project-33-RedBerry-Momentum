import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import { addDays } from "date-fns";
import ka from "date-fns/locale/ka";
import "react-datepicker/dist/react-datepicker.css";
import FormHeader from "../components/formNewTask/FormHeader";
import FormInput from "../components/formNewTask/FormInput";
import FormTextarea from "../components/formNewTask/FormTextarea";
import FormSelect from "../components/formNewTask/FormSelect";
import FormDatePicker from "../components/formNewTask/FormDatePicker";

registerLocale("ka", ka);

const NewTask = () => {
  const today = new Date();
  const tomorrow = addDays(today, 1);

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
      deadline: tomorrow,
    },
  });

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

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
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `მონაცემები ვერ შეინახა: ${errorMessage}`,
        showConfirmButton: false,
        timer: 2000,
        background: "#F8F3FE",
        color: "#212529",
        customClass: {
          popup: "rounded-lg shadow-lg p-6",
          title: "text-[#212529] font-semibold text-lg",
        },
      });
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
      <FormHeader title="შექმენი ახალი დავალება" />
      <div className="max-w-[1920px] w-full min-h-[calc(100vh-300px-224px)] rounded-[4px] border-[#ddd2ff70] border-[0.3px] bg-[#FBF9FFA6] py-[65px] px-[55px] ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <FormInput
                label="სათაური *"
                register={register}
                name="title"
                rules={{
                  required: "სათაური აუცილებელია",
                  minLength: {
                    value: 3,
                    message: "მინიმუმ 3 სიმბოლო",
                  },
                  maxLength: {
                    value: 255,
                    message: "მაქსიმუმ 255 სიმბოლო",
                  },
                }}
                errors={errors}
                onFocus={() => setIsTitleFocused(true)}
                watch={watch}
                isFocused={isTitleFocused}
              />
              <FormTextarea
                label="აღწერა"
                register={register}
                name="description"
                rules={{
                  validate: {
                    minWords: (value) =>
                      value.split(" ").filter(Boolean).length >= 4 ||
                      "მინიმუმ 4 სიტყვა",
                    maxLength: (value) =>
                      value.length <= 255 || "მაქსიმუმ 255 სიმბოლო",
                  },
                }}
                errors={errors}
                onFocus={() => setIsDescriptionFocused(true)}
                watch={watch}
                isFocused={isDescriptionFocused}
              />
              <div className="grid grid-cols-2 gap-6">
                <FormSelect
                  label="პრიორიტეტი *"
                  control={control}
                  name="priority"
                  options={optionsPriorities}
                  rules={{ required: "აირჩიეთ პრიორიტეტი" }}
                  errors={errors}
                  placeholder="აირჩიეთ პრიორიტეტი"
                />
                <FormSelect
                  label="სტატუსი *"
                  control={control}
                  name="status"
                  options={optionsStatuses}
                  rules={{ required: "აირჩიეთ სტატუსი" }}
                  errors={errors}
                  placeholder="აირჩიეთ სტატუსი"
                />
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-4">
              <FormSelect
                label="დეპარტამენტი *"
                control={control}
                name="department"
                options={optionsDepartments}
                rules={{ required: "აირჩიეთ დეპარტამენტი" }}
                errors={errors}
                placeholder="აირჩიეთ დეპარტამენტი"
                onChange={(selectedOption) =>
                  setSelectedDepartment(selectedOption?.value)
                }
              />
              <FormSelect
                label="პასუხისმგებელი პირი *"
                control={control}
                name="responsiblePerson"
                options={optionsEmployees}
                rules={{ required: "აირჩიეთ პასუხისმგებელი პირი" }}
                errors={errors}
                placeholder="აირჩიეთ პასუხისმგებელი პირი"
                isDisabled={!selectedDepartment}
              />
              <FormDatePicker
                label="დედლაინი *"
                control={control}
                name="deadline"
                rules={{
                  required: "აირჩიეთ დედლაინი",
                  validate: (value) => {
                    const selectedDate = new Date(value).setHours(0, 0, 0, 0);
                    const todayDate = new Date().setHours(0, 0, 0, 0);
                    return (
                      selectedDate >= todayDate ||
                      "წარსული თარიღი არ არის დაშვებული"
                    );
                  },
                }}
                errors={errors}
                locale="ka"
                dateFormat="dd-MM-yyyy"
                minDate={today}
                defaultValue={tomorrow}
              />
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
