import { useState, FormEvent } from 'react';
import { Plus, Loader2 } from 'lucide-react';

interface AddTaskFormProps {
  onAddTask: (title: string) => Promise<void>;
}

const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setIsSubmitting(true);
    try {
      await onAddTask(trimmedTitle);
      setTitle('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="input-field"
            disabled={isSubmitting}
            maxLength={200}
          />
        </div>
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="btn-primary flex items-center gap-2 min-w-[100px] justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Plus size={16} />
              Add Task
            </>
          )}
        </button>
      </div>
      
      {title.length > 180 && (
        <p className="text-sm text-orange-600 mt-2">
          {200 - title.length} characters remaining
        </p>
      )}
    </form>
  );
};

export default AddTaskForm; 