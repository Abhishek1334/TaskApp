import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(): Task[];
    findOne(id: string): Task;
    create(createTaskDto: CreateTaskDto): Task;
    update(id: string, updateTaskDto: UpdateTaskDto): Task;
    remove(id: string): void;
}
