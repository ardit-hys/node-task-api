import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import Header from "./Header";
import TaskService from "../services/TaskService";

const UpdateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
    status: "",
  });
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchTaskToUpdate(id);
      console.log("id param", id);
    }
  }, [id]);

  const fetchTaskToUpdate = async (id) => {
    const response = await TaskService.getTaskById(id);
    setTask({
      title: response.title,
      description: response.description,
      status: response.status,
      dueDate: moment(response.due_date).format("YYYY-MM-DD"),
      category: response.category,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await TaskService.updateTask(id, task);
    } catch (error) {
      toast.error(`Error updating task. Try again`);
    }
    toast.success(`Task updated successfully!`);
    navigate("/");
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container-fluid">
      <Header searchActive={false} />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card w-lg-500 w-md-80vw w-100">
          <div className="card-body p-6">
            <h5 className="card-title">Update Task</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  maxLength="64"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  required
                  maxLength="320"
                  value={task.description}
                  onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  required
                  maxLength="19"
                  value={task.category}
                  onChange={(e) =>
                    setTask({ ...task, category: e.target.value })
                  }
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="date">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  required
                  min={getTodayDate()}
                  value={task.dueDate}
                  onChange={(e) =>
                    setTask({ ...task, dueDate: e.target.value })
                  }
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  maxLength="20"
                  value={task.status}
                  onChange={(e) => setTask({ ...task, status: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-5">
                Update Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
