import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { publicAxios } from "../config/axios";
import Loader from "../components/Loader";
import BtnCreateNew from "../components/button/BtnCreateNew";

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
  } = useForm();

  const mutation = useMutation({
    mutationFn: (newTask) => publicAxios.post("/tasks", newTask),
    onSuccess: () => {
      reset();
      alert("დავალება წარმატებით შეიქმნა!");
    },
    onError: (error) => {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
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
                  <select
                    {...register("priority", {
                      required: "აირჩიეთ პრიორიტეტი",
                    })}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">აირჩიეთ</option>
                    {priorities.map((priority) => (
                      <option key={priority.id} value={priority.id}>
                        {priority.name}
                      </option>
                    ))}
                  </select>
                  {errors.priority && (
                    <p className="text-red-500 text-sm">
                      {errors.priority.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-medium">სტატუსი</label>
                  <select
                    {...register("status", { required: "აირჩიეთ სტატუსი" })}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">აირჩიეთ</option>
                    {statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </select>
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
                <select
                  {...register("department", {
                    required: "აირჩიეთ დეპარტამენტი",
                  })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">აირჩიეთ</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-red-500 text-sm">
                    {errors.department.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-medium">პასუხისმგებელი პირი</label>
                <select
                  {...register("responsiblePerson", {
                    required: "აირჩიეთ პასუხისმგებელი პირი",
                  })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">აირჩიეთ</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} {employee.surname}
                    </option>
                  ))}
                </select>
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
