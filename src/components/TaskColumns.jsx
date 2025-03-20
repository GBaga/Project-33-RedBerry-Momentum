import TaskCard from "../components/TaskCard";

const TaskColumns = ({ statuses, filteredTasks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {statuses.map(({ id, color, label }) => (
        <div key={id} className="p-2 flex flex-col gap-7 items-center">
          <h2
            className="text-white font-medium text-lg max-w-sm w-full h-[54px] flex justify-center items-center rounded-[10px]"
            style={{ backgroundColor: color }}
          >
            {label}
          </h2>
          {filteredTasks
            ?.filter((task) => task.status?.id === id)
            .map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                statusId={task.status?.id}
                name={task.name}
                description={task.description}
                dueDate={task.due_date}
                department={task.department?.name}
                departmentId={task.department?.id}
                employeeName={task.employee?.name}
                employeeAvatar={task.employee?.avatar}
                priority={task.priority?.name}
                priorityId={task.priority?.id}
                priorityIcon={task.priority?.icon}
                totalComments={task.total_comments}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default TaskColumns;
