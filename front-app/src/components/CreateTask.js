import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../functions/taskFunctions";
import { toast } from "react-toastify";
import Header from "./Header";

const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleCreateTask = async (event) => {
    event.preventDefault();
    try {
      await createTask(task);
    } catch (error) {
      toast.error(`Error creating task. Try again`);
      navigate("/new");
    }
    toast.success(`Task created successfully!`);
    navigate("/");
    // console.log('task body', task);
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
            <h5 className="card-title">Create New Task</h5>
            <form onSubmit={handleCreateTask}>
              <div className="form-group mb-4">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  maxLength="64"
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
                  onChange={(e) =>
                    setTask({
                      ...task,
                      category:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1),
                    })
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
                  onChange={(e) =>
                    setTask({
                      ...task,
                      status:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1),
                    })
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary mt-5">
                Create Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
