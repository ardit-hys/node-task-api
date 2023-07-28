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

export default class TaskRepository {
  static async getAllTasks(req, res) {
    const result = await client.query(getAllTasksQuery);
    res.status(200).json(result.rows);
  }

  static async getTaskById(req) {
    const { id } = req.params;
    const result = await client.query(getTaskByIdQuery, [id]);
    return result.rows[0] || null;
  }

  static async getTasksByTitle(title) {
    console.log(title)
    const result = await client.query(getTaskByTitleQuery, [title]);
    console.log(result.rows)
    return result.rows;
  }

  static async createTask(req) {
    const { title, category, description, status, dueDate } = req.body;

    try {
      let categoryId;

      const categoryResult = await client.query(findCategoryQuery, [category]);

      if (categoryResult.rows.length > 0) {
        categoryId = categoryResult.rows[0].category_id;
      } else {
        const insertCategoryResult = await client.query(insertCategoryQuery, [
          category,
        ]);
        categoryId = insertCategoryResult.rows[0].category_id;
      }

      if (dueDate && new Date(dueDate) < new Date()) {
        throw new Error("Due date cannot be earlier than today");
      }

      const taskValues = [title, categoryId, description, status, dueDate];
      await client.query(createTaskQuery, taskValues);
    } catch (error) {
      console.log('Error creating Task', error);
      
    }
  }

  static async updateTask(req) {
    const { id } = req.params; // ID passed as a URL parameter
    const { title, category, description, status, dueDate } = req.body;

    try {
      let categoryId;
      const categoryResult = await client.query(findCategoryQuery, [category]);

      if (categoryResult.rows.length > 0) {
        categoryId = categoryResult.rows[0].category_id;
      } else {
        const insertCategoryResult = await client.query(insertCategoryQuery, [
          category,
        ]);
        categoryId = insertCategoryResult.rows[0].category_id;
      }

      if (dueDate && new Date(dueDate) < new Date()) {
        throw new Error("Due date cannot be earlier than today");
      }

      const values = [title, categoryId, description, status, dueDate, id];
      await client.query(updateTaskQuery, values);
    } catch (error) {
      console.log('TaskRepository - UpdateTaskError', error);
    }
  }

  static async deleteTask(req) {
    const { id } = req.params;
    try {
      await client.query(deleteTaskQuery, [id]);
    } catch (error) {
      console.log("Error deleting task", error);
    }
  }
}
