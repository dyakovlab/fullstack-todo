import express from "express";
import * as TaskService from "../services/task";

const taskRouter = express.Router();

/**
 * @swagger
 * /api/v1/task:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with the provided text.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       500:
 *         description: Internal server error.
 */
taskRouter.post("/", async (req, res) => {
  try {
    await TaskService.createTask(req.body);
    res.status(201).send();
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

/**
 * @swagger
 * /api/v1/task:
 *   get:
 *     summary: Get all tasks
 *     description: Get a list of all tasks.
 *     responses:
 *       200:
 *         description: Successfully retrieved task list.
 *       500:
 *         description: Internal server error.
 */
taskRouter.get("/", async (_req, res) => {
  try {
    const data = await TaskService.tasksList();
    res.status(200).send(data);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

/**
 * @swagger
 * /api/v1/task/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Get a task by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved task.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */
taskRouter.get("/:id", async (req, res) => {
  try {
    const data = await TaskService.tasksDetail(req.params.id);
    data ? res.status(200).send(data) : res.status(404).send();
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

/**
 * @swagger
 * /api/v1/task/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     description: Delete a task by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete.
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       500:
 *         description: Internal server error.
 */
taskRouter.delete("/:id", async (req, res) => {
  try {
    await TaskService.tasksRemove(req.params.id);
    res.status(200).send();
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

/**
 * @swagger
 * /api/v1/task/{id}:
 *   put:
 *     summary: Update a task by ID
 *     description: Update a task with the provided text by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       500:
 *         description: Internal server error.
 */
taskRouter.put("/:id", async (req, res) => {
  try {
    await TaskService.tasksUpdate(req.params.id, req.body);
    res.status(200).send();
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

export { taskRouter };
