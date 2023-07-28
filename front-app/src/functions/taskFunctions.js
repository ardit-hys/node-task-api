// import axios from "axios";

// export const getAllTasks = async () => {
//   return await axios.get(process.env.REACT_APP_TASK_API_URL);
// };

// export const getTaskByTitle = async (arg) => {
//   return await axios.get(`${process.env.REACT_APP_TASK_API_URL}/search/`, {
//     params: {
//       title: arg,
//     },
//   });
// };

// export const getTaskById = async (id) => {
//   return await axios.get(`${process.env.REACT_APP_TASK_API_URL}/${id}`);
// };

// export const updateTask = async (id, task) => {
//   return await axios.put(`${process.env.REACT_APP_TASK_API_URL}/${id}`, task);
// };

// export const deleteTask = async (id) => {
//   return await axios.delete(`${process.env.REACT_APP_TASK_API_URL}/${id}`);
// }

// export const createTask = async (task) => {
//   return await axios.post(process.env.REACT_APP_TASK_API_URL, task);
// }

export const getAllTasks = async () => {
  const response = await fetch(process.env.REACT_APP_TASK_API_URL);
  console.log(response)
  return await response.json();
};

export const getTaskByTitle = async (arg) => {
  const response = await fetch(`${process.env.REACT_APP_TASK_API_URL}/search/?title=${arg}`);
  return await response.json();
};

export const getTaskById = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_TASK_API_URL}/${id}`);
  return await response.json();
};

export const updateTask = async (id, task) => {
  const response = await fetch(`${process.env.REACT_APP_TASK_API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  return await response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_TASK_API_URL}/${id}`, {
    method: 'DELETE',
  });

  return await response.json();
};

export const createTask = async (task) => {
  const response = await fetch(process.env.REACT_APP_TASK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  return await response.json();
};
