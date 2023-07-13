import axios from "axios";

export const getAllTasks = async () => {
  return await axios.get(process.env.REACT_APP_TASK_API_URL);
};

export const getTaskByTitle = async (arg) => {
  return await axios.get(`${process.env.REACT_APP_TASK_API_URL}/search/`, {
    params: {
      title: arg,
    },
  });
};

export const getTaskById = async (id) => {
  return await axios.get(`${process.env.REACT_APP_TASK_API_URL}/${id}`);
};

export const updateTask = async (id, task) => {
  return await axios.put(`${process.env.REACT_APP_TASK_API_URL}/${id}`, task);
};

export const deleteTask = async (id) => {
  return await axios.delete(`${process.env.REACT_APP_TASK_API_URL}/${id}`);
}

export const createTask = async (task) => {
  return await axios.post(process.env.REACT_APP_TASK_API_URL, task);
}