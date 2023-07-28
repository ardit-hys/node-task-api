import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import moment from "moment";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TaskService from "../services/TaskService";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [titleSearch, setTitleSearch] = useState("");
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (titleSearch) {
        searchTaskByTitle(titleSearch);
      } else {
        getTasks();
      }
    }, 1000);

    return () => clearTimeout(delayTimer);
  }, [titleSearch]);

  const getTasks = async () => {
    const response = await TaskService.getAllTasks();

    setTasks(response);
    console.log(response);
  };

  const searchTaskByTitle = async (text) => {
    try {
      const response = await TaskService.getTaskByTitle(text);
      setTasks(response);
      console.log(response);
    } catch (error) {
      console.error("Error searching tasks:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await TaskService.deleteTask(taskId);
      toast.info(`Task successfully deleted`);
      getTasks();
    } catch (error) {
      console.log("error deleting task", error);
      toast.error(`Error deleting task`);
    }
  };

  const handleMarkAsDone = async (taskIdToMark) => {
    try {
      console.log("handlemark");
      const taskToMark = await TaskService.getTaskById(taskIdToMark);
      const updatedTask = { ...taskToMark, status: "Done" }; // Create a new task object with the updated status
      console.log("taskToMark", taskToMark);
      console.log("updatedTask", updatedTask);
      await TaskService.updateTask(taskIdToMark, updatedTask);
      toast.success("Task marked as done");
      getTasks();
    } catch (error) {
      toast.error(`Error marking as done`);
      console.log("Error marking as done", error);
    }
  };

  return (
    <div className="container-fluid">
      <Header setTitleSearch={setTitleSearch} searchActive={true} />

      <div className="row p-4">
        {tasks.map((task) => (
          <div className={`col-md-4 mb-4 `} key={task.task_id}>
            <div
              className={`card ${task.status === "Done" ? "done-task" : ""}`}
            >
              <div className="card-body">
                <h5 className="card-title mb-4">{task.title}</h5>
                <h6 className="card-subtitle mb-4 text-muted">
                  {task.category} {" - "} {task.status}
                </h6>
                <p className="card-text">{task.description.substring(0, 80)}</p>
                <p className="card-text">
                  {task.due_date
                    ? `Due: ${moment(task.due_date, "YYYYMMDD").fromNow()}` +
                      ` — ` +
                      `${moment(task.due_date).format("MMMM DD YYYY")}`
                    : ""}
                </p>
                <div className="d-flex justify-content-end">
                  <Link
                    to={`/update/${task.task_id}`}
                    data-toggle="tooltip" data-placement="top" title="Edit"
                    className="btn btn-outline-primary me-2 align-text-center"
                  >
                    <EditOutlined className="text-center my-1" />
                  </Link>
                  <button
                    type="button"
                    data-toggle="tooltip" data-placement="top" title="Mark as done"
                    className="btn btn-outline-info me-2 align-text-center"
                    onClick={() => handleMarkAsDone(task.task_id)}
                  >
                    <CheckOutlined className="text-center my-1" />
                  </button>
                  <button
                    type="button"
                    name="Delete"
                    className="btn btn-outline-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-toggle="tooltip" data-placement="top" title="Delete"
                    onClick={() => setTaskIdToDelete(task.task_id)}
                  >
                    <DeleteOutlined className="text-center my-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <DeleteModal
        taskIdToDelete={taskIdToDelete}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskList;
