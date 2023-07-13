import client from "../utils/database.js";
import {
  getAllTasksQuery,
  createTaskQuery,
  findCategoryQuery,
  insertCategoryQuery,
  updateTaskQuery,
  deleteTaskQuery,
  getTaskByTitleQuery,
  getTaskByIdQuery,
} from "../utils/queries.js";

export const getAllTasks = async (req, res) => {
  try {
    const result = await client.query(getAllTasksQuery);

    if (result.rows.length === 0) {
      // No tasks found
      res.status(404).json({ error: "No tasks found" });
      return;
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error retrieving tasks", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(getTaskByIdQuery, [id]);

    if (result.rows.length === 0) {
      // No task found
      res.status(404).json({ error: "No task found" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log("Error retrieving tasks", error);
    res.status(404).json({ error: "Task not found" });
  }
};

export const getTaskByTitle = async (req, res) => {
  const { title } = req.query; // title is passed as a query parameter

  try {
    const result = await client.query(getTaskByTitleQuery, [title]);

    if (result.rows.length === 0) {
      // No tasks found
      res.status(404).json({ error: "No tasks found" });
      return;
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error retrieving tasks by title", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createTask = async (req, res) => {
  const { title, category, description, status, dueDate } = req.body;

  try {
    let categoryId;

    const categoryResult = await client.query(findCategoryQuery, [category]);

    if (categoryResult.rows.length > 0) {
      // Category already exists, retrieve the category_id
      categoryId = categoryResult.rows[0].category_id;
    } else {
      // Category doesn't exist, create a new category and retrieve the category_id
      const insertCategoryResult = await client.query(insertCategoryQuery, [
        category,
      ]);
      categoryId = insertCategoryResult.rows[0].category_id;
    }

    // Check if the due date is earlier than today
    if (dueDate && new Date(dueDate) < new Date()) {
      res.status(400).json({ error: "Due date cannot be earlier than today" });
      return;
    }

    const values = [title, categoryId, description, status, dueDate];

    await client.query(createTaskQuery, values);

    console.log("Task created successfully");
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.log("Error creating a task", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params; // ID passed as a URL parameter
  const { title, category, description, status, dueDate } = req.body;

  try {
    let categoryId;

    const categoryResult = await client.query(findCategoryQuery, [category]);

    if (categoryResult.rows.length > 0) {
      // Category already exists, retrieve the category_id
      categoryId = categoryResult.rows[0].category_id;
    } else {
      // Category doesn't exist, create a new category and retrieve the category_id
      const insertCategoryResult = await client.query(insertCategoryQuery, [
        category,
      ]);
      categoryId = insertCategoryResult.rows[0].category_id;
    }

    // Check if the due date is earlier than today
    if (dueDate && new Date(dueDate) < new Date()) {
      res.status(400).json({ error: "Due date cannot be earlier than today" });
      return;
    }

    const values = [title, categoryId, description, status, dueDate, id];

    await client.query(updateTaskQuery, values);

    console.log("Task updated successfully");
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log("Error updating task", error);
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await client.query(deleteTaskQuery, [id]);

    console.log("Task deleted successfully");
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error deleting task", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
