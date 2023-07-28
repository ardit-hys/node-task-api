import TaskRepository from "../repositories/tasks.repository.js";

export default class TaskService {
  async getAllTasks(req, res) {
    try {
      return await TaskRepository.getAllTasks(req, res);
    } catch (error) {
      console.log("Error retrieving tasks", error);
      throw new Error("Internal server error");
    }
  }

  async getTaskById(req, res) {
    try {
      const task = await TaskRepository.getTaskById(req);
      if (!task) {
        res.status(404).json({ error: "Task not found" });
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      console.log("Error retrieving task by ID", error);
      res.status(404).json({ error: "Task not found" });
      throw new Error("GetTaskById - Internal server error");
    }
  }

  async getTasksByTitle(req, res) {
    const { title } = req.query; // title is passed as a query parameter
    console.log(title);
    try {
      const tasks = await TaskRepository.getTasksByTitle(title);
      if (!tasks.length) {
        console.log("No tasks found with that title");
      }

      const etag = "12345";

      // const hashEtag = crypto.createHash("md5").update(tasks).digest('hex');

      // has client sent an ETag in the if-none-match header
      const clientETag = req.headers["if-none-match"];

      if (clientETag === etag) {
        return res.status(304).end();
      }

      res.set({
        "Cache-Control": "public, max-age=3600",
        ETag: etag,
      });

      return res.status(200).json(tasks);
    } catch (error) {
      console.log("Error retrieving tasks by title", error);
      res.status(500).json({ error: "Internal server error" });
      throw new Error("GetTasksByTitle - Internal server error");
    }
  }

  async createTask(req, res) {
    try {
      await TaskRepository.createTask(req);
      res.status(201).json({ message: "Task created successfully" });
    } catch (error) {
      console.log("Error creating a task", error);
      res.status(500).json({ error: "Internal server error" });
      throw new Error("CreateTask - Internal server error");
    }
  }

  async updateTask(req, res) {
    try {
      await TaskRepository.updateTask(req);
      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      console.log("Error updating task", error);
      res.status(500).json({ error: "Internal server error" });
      throw new Error("UpdateTask - Internal server error");
    }
  }

  async deleteTask(req, res) {
    try {
      await TaskRepository.deleteTask(req);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.log("Error deleting task", error);
      res.status(500).json({ error: "Internal server error" });
      throw new Error("DeleteTask - Internal server error");
    }
  }
}
