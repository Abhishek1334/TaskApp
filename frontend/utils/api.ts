import { Task, CreateTaskDto, UpdateTaskDto } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new ApiError(response.status, errorText || 'Network error');
  }
  
  if (response.status === 204) {
    return null as T;
  }
  
  return response.json();
};

export const tasksApi = {
  // GET /tasks - Fetch all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    return handleResponse<Task[]>(response);
  },

  // GET /tasks/:id - Fetch single task
  getTask: async (id: string): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    return handleResponse<Task>(response);
  },

  // POST /tasks - Create new task
  createTask: async (taskData: CreateTaskDto): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return handleResponse<Task>(response);
  },

  // PUT /tasks/:id - Update task completion status
  updateTask: async (id: string, updateData: UpdateTaskDto): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    return handleResponse<Task>(response);
  },

  // DELETE /tasks/:id - Delete task
  deleteTask: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(response);
  },
}; 