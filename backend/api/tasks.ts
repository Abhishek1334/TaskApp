import { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory task storage
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

let tasks: Task[] = [];

// CORS headers function
const setCorsHeaders = (res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers for all requests
  setCorsHeaders(res);

  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Parse URL to determine if it's for a specific task
  const url = req.url || '';
  const pathParts = url.split('/').filter(Boolean);
  const isSpecificTask = pathParts.length > 1; // /api/tasks/123 or /tasks/123
  const taskId = isSpecificTask ? pathParts[pathParts.length - 1] : null;

  try {
    // Handle specific task operations
    if (isSpecificTask && taskId) {
      const taskIndex = tasks.findIndex(task => task.id === taskId);

      switch (req.method) {
        case 'GET':
          if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
          }
          return res.status(200).json(tasks[taskIndex]);

        case 'PUT':
          if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
          }

          const { completed } = req.body;
          if (typeof completed !== 'boolean') {
            return res.status(400).json({ message: 'Completed must be a boolean value' });
          }

          tasks[taskIndex] = {
            ...tasks[taskIndex],
            completed,
            updatedAt: new Date(),
          };

          return res.status(200).json(tasks[taskIndex]);

        case 'DELETE':
          if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
          }

          tasks.splice(taskIndex, 1);
          return res.status(204).end();

        default:
          res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'OPTIONS']);
          return res.status(405).json({ message: `Method ${req.method} not allowed` });
      }
    }

    // Handle collection operations
    switch (req.method) {
      case 'GET':
        return res.status(200).json(tasks);

      case 'POST':
        const { title } = req.body;
        if (!title || typeof title !== 'string' || title.trim().length === 0) {
          return res.status(400).json({ message: 'Title is required and must be a non-empty string' });
        }

        const newTask: Task = {
          id: Date.now().toString(),
          title: title.trim(),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        tasks.push(newTask);
        return res.status(201).json(newTask);

      default:
        res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('Error in tasks API:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 