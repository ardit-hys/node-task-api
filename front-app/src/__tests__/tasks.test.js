import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TaskList from "../components/TaskList";
import "@testing-library/jest-dom";
import { BrowserRouter as Router, createMemoryHistory } from "react-router-dom";

// Mock the global fetch function
global.fetch = jest.fn();

// Set up a mock response for getAllTasks
const mockResponse = [
  {
    task_id: 8,
    title: "Recording",
    category: "Work",
    description: "recording the video",
    status: "Doing",
    due_date: "2023-07-13T22:00:00.000Z",
  },
];

beforeEach(() => {
  // Reset the fetch mock before each test
  global.fetch.mockClear();
});

describe("TaskList component", () => {
  test("it should fetch and render tasks correctly", async () => {
    // Set up the mock response for getAllTasks
    global.fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    render(
      <Router>
        <TaskList />
      </Router>
    );

    await waitFor(() => screen.getByText("Recording"));

    const taskCard = screen.getByText("Recording");
    expect(taskCard).toBeInTheDocument();
  });
});

describe("Edit Redirect to Update Task Component", () => {
  it('navigates to update task component when "Edit" button is clicked', async () => {
    // Set up the mock response for getAllTasks
    global.fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    const history = createMemoryHistory();

    // Rendering inside a Router (to enable navigation)
    render(
      <Router>
        <TaskList />
      </Router>
    );

    // Wait for tasks to be fetched and rendered
    await waitFor(() => screen.getByText("Recording"));

    const taskCard = screen.getByText("Recording");
    expect(taskCard).toBeInTheDocument();

    const editButton = screen.getByRole("link", { name: /Edit/i });
    await waitFor(() => fireEvent.click(editButton)); // Add await here

    // Wait for the navigation to complete
    await waitFor(() => expect(history.location.pathname).toBe(`/update/8`)); // Replace '8' with the actual task_id

    const updateTaskComponent = screen.getByText(/Update Task/i);
    expect(updateTaskComponent).toBeInTheDocument();
  });
});
