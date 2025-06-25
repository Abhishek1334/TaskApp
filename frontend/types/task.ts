export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  completed?: boolean;
}

export interface UpdateTaskDto {
  completed: boolean;
} 