import { useForm, Controller } from "react-hook-form"; // Import Controller
import { useMutation, useQuery } from "@tanstack/react-query";
import { publicAxios } from "../config/axios";
import Loader from "../components/Loader";
import BtnCreateNew from "../components/button/BtnCreateNew";
import ReactSelect from "react-select";
import { useState } from "react";
import Swal from "sweetalert2";

const fetchStatuses = async () => {
  const { data } = await publicAxios.get("/statuses");
  return data;
};

const fetchEmployees = async () => {
  const { data } = await publicAxios.get("/employees");
  return data;
};

const fetchDepartments = async () => {
  const { data } = await publicAxios.get("/departments");
  return data;
};

const fetchPriorities = async () => {
  const { data } = await publicAxios.get("/priorities");
  return data;
};

const NewTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

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
        timer: 3000,
        background: "#F8F3FE",
        color: "#212529",
        customClass: {
          popup: "rounded-lg shadow-lg p-6",
          title: "text-[#212529] font-semibold text-lg",
        },
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
          timer: 3000,
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
          timer: 3000,
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

  const { setValue } = useForm();

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

  // Prepare options for ReactSelect dropdown
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight">
        შექმენი ახალი დავალება
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block font-medium">სათაური</label>
                <input
                  {...register("title", { required: "სათაური აუცილებელია" })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div>
                <label className="block font-medium">აღწერა</label>
                <textarea
                  {...register("description", {
                    required: "აღწერა აუცილებელია",
                  })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium">პრიორიტეტი</label>
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
                        } // Ensure value is reset to null
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value); // Update form state with selected priority id
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
                  <label className="block font-medium">სტატუსი</label>
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
                        } // Ensure value is reset to null
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
                <label className="block font-medium">დეპარტამენტი</label>
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
                        setSelectedDepartment(selectedOption?.value); // Update selected department
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
                <label className="block font-medium">პასუხისმგებელი პირი</label>
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
                      } // Ensure value is reset to null
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption?.value);
                      }}
                      placeholder="აირჩიეთ პასუხისმგებელი პირი"
                      className="w-full"
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
                <label className="block font-medium">დედლაინი</label>
                <input
                  type="date"
                  {...register("deadline", { required: "აირჩიეთ დედლაინი" })}
                  className="w-1/2 p-2 border border-gray-300 rounded"
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
