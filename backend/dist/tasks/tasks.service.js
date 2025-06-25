"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
let TasksService = class TasksService {
    constructor() {
        this.tasks = [];
    }
    findAll() {
        return this.tasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    findOne(id) {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found`);
        }
        return task;
    }
    create(createTaskDto) {
        const task = {
            id: this.generateId(),
            title: createTaskDto.title,
            completed: createTaskDto.completed || false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.tasks.push(task);
        return task;
    }
    update(id, updateTaskDto) {
        const task = this.findOne(id);
        task.completed = updateTaskDto.completed;
        task.updatedAt = new Date();
        return task;
    }
    remove(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found`);
        }
        this.tasks.splice(taskIndex, 1);
    }
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map