import TaskRepository from "./../repositories/tasks.repository.js";
import TaskService from "./../services/tasks.service.js";

const taskService = new TaskService();

jest.mock("./../repositories/tasks.repository.js");

describe("Get Task by Id behavior", () => {
  test("should return a task object with the correct id", async () => {
    const mockReq = { params: { id: 9 } };
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const mockTask = {
      task_id: 9,
      title: "Test refactor23",
      category: "Personal",
      description: "Testttt",
      status: "Not done",
      due_date: null,
    };

    TaskRepository.getTaskById.mockResolvedValue(mockTask);

    await taskService.getTaskById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockTask);
  });
  test("should return a 404 status for an invalid id", async () => {
    const mockReq = { params: { id: 999 } };
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    TaskRepository.getTaskById.mockResolvedValue(null); // Simulate no task found

    await taskService.getTaskById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Task not found" });
  });
});
