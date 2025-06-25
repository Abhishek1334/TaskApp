"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
let tasks = [];
const setCorsHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    res.setHeader('Access-Control-Max-Age', '86400');
};
async function handler(req, res) {
    setCorsHeaders(res);
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    const url = req.url || '';
    const pathParts = url.split('/').filter(Boolean);
    const isSpecificTask = pathParts.length > 1;
    const taskId = isSpecificTask ? pathParts[pathParts.length - 1] : null;
    try {
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
        switch (req.method) {
            case 'GET':
                return res.status(200).json(tasks);
            case 'POST':
                const { title } = req.body;
                if (!title || typeof title !== 'string' || title.trim().length === 0) {
                    return res.status(400).json({ message: 'Title is required and must be a non-empty string' });
                }
                const newTask = {
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
    }
    catch (error) {
        console.error('Error in tasks API:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
//# sourceMappingURL=tasks.js.map