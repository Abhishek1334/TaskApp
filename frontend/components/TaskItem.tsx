import { useState } from 'react';
import { Check, Trash2, Clock } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TaskItem = ({ task, onToggleComplete, onDelete }: TaskItemProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      await onToggleComplete(task.id, !task.completed);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md dark:hover:shadow-gray-900/20 transition-all duration-200 animate-slide-in">
      <div className="flex items-start gap-3">
        {/* Completion Toggle Button */}
        <button
          onClick={handleToggleComplete}
          disabled={isUpdating}
          className={`
            flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
            ${task.completed 
              ? 'bg-green-500 dark:bg-green-400 border-green-500 dark:border-green-400 text-white' 
              : 'border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
            }
            ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {task.completed && <Check size={12} />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`
            text-lg font-medium leading-tight break-words
            ${task.completed ? 'task-completed' : 'text-gray-900 dark:text-gray-100'}
          `}>
            {task.title}
          </h3>
          
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock size={12} />
            <span>Created {formatDate(task.createdAt)}</span>
            {task.createdAt !== task.updatedAt && (
              <span>• Updated {formatDate(task.updatedAt)}</span>
            )}
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`
            flex-shrink-0 p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20
            transition-all duration-200 opacity-0 group-hover:opacity-100
            ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem; 