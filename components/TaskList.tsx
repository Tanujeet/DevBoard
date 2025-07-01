// components/TaskList.jsx
import React from "react";

const TaskList = ({ tasks }:{tasks:any}) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Existing Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task:any, idx:any) => (
            <div
              key={task.id || idx} // Use task.id if available, otherwise idx
              className="flex items-center justify-between p-4 rounded-xl border shadow-sm bg-white"
            >
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Due: {task.dueDate}
                </p>
                <h3 className="text-lg font-medium">{task.title}</h3>
                <p className="text-muted-foreground">{task.status}</p>
              </div>
              {/* You can add edit/delete buttons here later */}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TaskList;
