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
    }
    catch (error) {
        console.error('Error in task API:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
//# sourceMappingURL=%5Bid%5D.js.map