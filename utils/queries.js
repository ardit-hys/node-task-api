export const getAllTasksQuery = `SELECT tasks.task_id, tasks.title, categories.name AS category, tasks.description, tasks.status, tasks.due_date
FROM tasks
JOIN categories ON tasks.category_id = categories.category_id`;

export const createTaskQuery = `
INSERT INTO tasks (title, category_id, description, status, due_date)
VALUES ($1, $2, $3, $4, $5)
`;

export const findCategoryQuery = `SELECT category_id FROM categories WHERE name = $1`;

export const insertCategoryQuery = `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING category_id
      `;

export const updateTaskQuery = `
      UPDATE tasks
      SET title = $1, category_id = $2, description = $3, status = $4, due_date = $5
      WHERE task_id = $6
    `;

export const deleteTaskQuery = `DELETE FROM tasks WHERE task_id = $1`;

export const getTaskByTitleQuery = `SELECT * FROM tasks WHERE title ILIKE '%' || $1 || '%'`;
