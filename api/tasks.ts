import { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory task storage (same as your NestJS service)
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

  try {
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