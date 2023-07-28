import express from "express";
import TaskService from "../services/tasks.service.js";

const taskService = new TaskService();

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API to manage tasks
 */

/**
 * @swagger
 *   /tasks:
 *     get:
 *       summary: Get all tasks
 *       tags: [Tasks]
 *       responses:
 *         "200":
 *           description: The list of tasks
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/", taskService.getAllTasks);

/**
 * @swagger
 * /tasks/search:
 *   get:
 *     summary: Get a task by title search
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Title of the task to retrieve
 *     responses:
 *       "500":
 *         $ref: '#/components/responses/500'
 *       "404":
 *         $ref: '#/components/responses/404'
 *       "200":
 *         description: Successful! The tasks that match the title
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.get("/search", taskService.getTasksByTitle);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the task to retrieve
 *     responses:
 *       "500":
 *         $ref: '#/components/responses/500'
 *       "404":
 *         $ref: '#/components/responses/404'
 *       "200":
 *         description: Successful! The task that matches the id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.get("/:id", taskService.getTaskById);

/**
 * @swagger
 *   /tasks:
 *     post:
 *       summary: Create a task
 *       tags: [Tasks]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "201":
 *           description: Task created successfully
 *           contents:
 *             application/json
 */
router.post("/", taskService.createTask);

/**
 * @swagger
 *   /tasks/{id}:
 *     put:
 *       summary: Update a task by ID
 *       tags: [Tasks]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID of the task to update
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "404":
 *           $ref: '#/components/responses/404'
 *         "200":
 *           description: Task updated successfully
 *           contents:
 *             application/json
 */
router.put("/:id", taskService.updateTask);

/**
 * @swagger
 *   /tasks/{id}:
 *     delete:
 *       summary: Delete a task by ID
 *       tags: [Tasks]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Id of a task
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "404":
 *         $ref: '#/components/responses/404'
 *         "200":
 *           description: Task deleted successfully
 *           contents:
 *             application/json
 */
router.delete("/:id", taskService.deleteTask);

export default router;
