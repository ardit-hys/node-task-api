import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "Built with Node, Express using a PostgreSQL Database",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    components: {
      schemas: {
        Task: {
          type: "object",
          required: ["title", "description"],
          properties: {
            task_id: {
              type: "integer",
              description: "The id of the task",
            },
            title: {
              type: "string",
              description: "The title of the task",
            },
            description: {
              type: "string",
              description: "The description of the task",
            },
            category: {
              type: "string",
              description: "The category of the task",
            },
            status: {
              type: "string",
              description: "The status of the task",
            },
            due_date: {
              type: "date",
              description: "When the task is due",
            },
          },
          example: {
            title: "Go to the barber",
            category: "Personal",
            description: "This is a description of a task",
            status: "Not done",
            dueDate: "2023-07-15",
          },
        },
      },
      responses: {
        400: {
          description: "Bad Request",
          contents: "application/json",
        },
        // 401: {
        //     description: 'Unauthorized',
        //     contents: 'application/json'
        // },
        404: {
          description: "Not found - the task was not found",
          contents: "application/json",
        },
        500: {
          description: "Internal Server Error",
          contents: "application/json",
        },
      },
    },
  },
  apis: ["./routes/tasks.routes.js"],
};

export const specs = swaggerJSDoc(options);
