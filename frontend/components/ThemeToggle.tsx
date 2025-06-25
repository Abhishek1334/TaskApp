import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700 
        hover:bg-gray-300 dark:hover:bg-gray-600 
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
        dark:focus:ring-offset-gray-800
        group
      "
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <Sun 
          size={20} 
          className={`
            absolute inset-0 text-yellow-500 transition-all duration-300 transform
            ${theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-75 opacity-0'
            }
          `}
        />
        
        {/* Moon Icon */}
        <Moon 
          size={20} 
          className={`
            absolute inset-0 text-blue-400 transition-all duration-300 transform
            ${theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-75 opacity-0'
            }
          `}
        />
      </div>
      
      {/* Optional glow effect */}
      <div className="
        absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 
        bg-gradient-to-r from-yellow-400 to-blue-500 
        transition-opacity duration-300 pointer-events-none
      " />
    </button>
  );
};

export default ThemeToggle; 