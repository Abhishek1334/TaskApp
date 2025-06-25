import { useState, useEffect } from 'react';
import Head from 'next/head';
import { CheckSquare, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { Task } from '@/types/task';
import { tasksApi } from '@/utils/api';
import TaskItem from '@/components/TaskItem';
import AddTaskForm from '@/components/AddTaskForm';
import ThemeToggle from '@/components/ThemeToggle';

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setError(null);
      const fetchedTasks = await tasksApi.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (title: string) => {
    try {
      const newTask = await tasksApi.createTask({ title });
      setTasks(prev => [newTask, ...prev]);
      toast.success('Task added successfully!');
    } catch (err) {
      toast.error('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const updatedTask = await tasksApi.updateTask(id, { completed });
      setTasks(prev => 
        prev.map(task => task.id === id ? updatedTask : task)
      );
      toast.success(completed ? 'Task completed!' : 'Task marked as incomplete');
    } catch (err) {
      toast.error('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await tasksApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasksCount = tasks.length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Todo App - Manage Your Tasks</title>
        <meta name="description" content="A modern, responsive todo list application built with Next.js and NestJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen py-8 px-4 transition-colors duration-300">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12 relative">
            {/* Theme Toggle Button */}
            <div className="absolute top-0 right-0">
              <ThemeToggle />
            </div>
            
            {/* Developer Badge */}
            <div className="absolute top-0 left-0">
              <a
                href="https://abhishek-rajoria.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
              >
                <span>👨‍💻</span>
                <span>By Abhishek</span>
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckSquare size={40} className="text-blue-600 dark:text-blue-400" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Todo App</h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Stay organized and productive with your personal task manager
            </p>
          </header>

          {/* Add Task Form */}
          <AddTaskForm onAddTask={handleAddTask} />

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-800 dark:text-red-300">{error}</p>
                </div>
                <button
                  onClick={loadTasks}
                  className="btn-secondary flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          {totalTasksCount > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  Total tasks: <span className="font-medium text-gray-900 dark:text-gray-100">{totalTasksCount}</span>
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  Completed: <span className="font-medium text-green-600 dark:text-green-400">{completedTasksCount}</span>
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  Remaining: <span className="font-medium text-blue-600 dark:text-blue-400">{totalTasksCount - completedTasksCount}</span>
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-green-500 dark:bg-green-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0}%` }}
                />
              </div>
            </div>
          )}

          {/* Tasks List */}
          {totalTasksCount === 0 ? (
            <div className="text-center py-12">
              <CheckSquare size={64} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">No tasks yet</h3>
              <p className="text-gray-500 dark:text-gray-400">Add your first task above to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <footer className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400 space-y-3">
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://github.com/Abhishek1334"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <a
                href="https://abhishek-rajoria.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Portfolio
              </a>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="text-gray-600 dark:text-gray-300">
                By Abhishek Rajoria
              </span>
            </div>
          </footer>

        </div>
      </main>
    </>
  );
};

export default Home; 