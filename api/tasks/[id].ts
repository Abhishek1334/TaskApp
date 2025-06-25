import { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory task storage (shared with tasks.ts)
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// This should be the same reference as in tasks.ts
// In a real app, you'd use a database
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

  const { id } = req.query;
  const taskId = Array.isArray(id) ? id[0] : id;

  if (!taskId) {
    return res.status(400).json({ message: 'Task ID is required' });
  }

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  try {
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
  } catch (error) {
    console.error('Error in task API:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 