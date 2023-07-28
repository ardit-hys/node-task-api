const CACHE_KEY = 'tasksCache'

export default class TaskService {
  static async getAllTasks() {
    const response = await fetch(process.env.REACT_APP_TASK_API_URL);
    return await response.json();
  }

  static async getTaskByTitle(arg) {
    // retrieve cached data
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY)) || {};

    // Check if there is a cached etag 
    const cachedETag = cache[arg]?.etag;

    // Add If-None-Match header to the request if ETag is cached
    // this header will be included in the following request
    // to let the server know that it has a cached version
    const headers = cachedETag ? { "If-None-Match": cachedETag } : {};

    try {
      const response = await fetch(
        `${process.env.REACT_APP_TASK_API_URL}/search/?title=${arg}`,
        {
          headers: headers,
        }
      );

      // If the server returns a 304 Not Modified status, use the cached response
      if (response.status === 304) {
        const cachedResponse = cache[arg].response;
        return cachedResponse;
      }

      const data = await response.json();

      // If the response contains an ETag, store it in the cache
      const serverETag = response.headers.get("ETag");
      if (serverETag) {
        cache[arg] = {
          response: data,
          etag: serverETag,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      }

      return data;
    } catch (error) {
      console.log("Error fetching tasks by title", error);
    }
  }

  // static async getTaskByTitle(arg) {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_TASK_API_URL}/search/?title=${arg}`
  //   );
  //   return await response.json();
  // }

  static async getTaskById(id) {
    const response = await fetch(`${process.env.REACT_APP_TASK_API_URL}/${id}`);
    return await response.json();
  }

  static async updateTask(id, task) {
    const response = await fetch(
      `${process.env.REACT_APP_TASK_API_URL}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    return await response.json();
  }

  static async deleteTask(id) {
    const response = await fetch(
      `${process.env.REACT_APP_TASK_API_URL}/${id}`,
      {
        method: "DELETE",
      }
    );

    return await response.json();
  }

  static async createTask(task) {
    const response = await fetch(process.env.REACT_APP_TASK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    return await response.json();
  }
}
