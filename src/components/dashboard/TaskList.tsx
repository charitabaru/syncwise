
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MoreHorizontal, 
  Calendar, 
  Edit, 
  Trash,
  SlidersHorizontal,
  CheckCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

// Mock tasks with localStorage persistence
const getSavedTasks = () => {
  const savedTasks = localStorage.getItem('syncwise_tasks');
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  
  // Default tasks if none in storage
  const defaultTasks = [
    { id: '1', title: 'Complete project proposal', description: 'Draft the full proposal document with timeline and budget', priority: 'High', category: 'Work', dueDate: '2023-06-29', completed: false, createdAt: new Date().toISOString() },
    { id: '2', title: 'Schedule team meeting', description: 'Coordinate with team members for next week\'s planning session', priority: 'Medium', category: 'Work', dueDate: '2023-06-30', completed: false, createdAt: new Date().toISOString() },
    { id: '3', title: 'Grocery shopping', description: 'Buy fresh vegetables, fruits, and essentials', priority: 'Low', category: 'Personal', dueDate: '2023-06-28', completed: true, createdAt: new Date().toISOString() },
    { id: '4', title: 'Review quarterly report', description: 'Analyze Q2 performance and prepare summary', priority: 'High', category: 'Work', dueDate: '2023-07-05', completed: false, createdAt: new Date().toISOString() },
    { id: '5', title: 'Pay utility bills', description: 'Electricity and internet bills due this week', priority: 'Medium', category: 'Personal', dueDate: '2023-06-27', completed: false, createdAt: new Date().toISOString() },
  ];
  
  localStorage.setItem('syncwise_tasks', JSON.stringify(defaultTasks));
  return defaultTasks;
};

const TaskList = ({ filter = null }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortOption, setSortOption] = useState('dueDate');
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-blue-100 text-blue-800',
  };

  const categoryColors = {
    Work: 'bg-indigo-100 text-indigo-800',
    Personal: 'bg-emerald-100 text-emerald-800',
  };

  // Load tasks and apply filtering
  useEffect(() => {
    const loadedTasks = getSavedTasks();
    setTasks(loadedTasks);

    let result = [...loadedTasks];

    // Apply category filtering
    if (categoryName) {
      result = result.filter(task => 
        task.category.toLowerCase() === categoryName.toLowerCase()
      );
    }

    // Apply status filtering
    if (filter === 'completed') {
      result = result.filter(task => task.completed);
    } else if (filter === 'upcoming') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      result = result.filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= today && !task.completed;
      });
    } else if (!filter && !categoryName) {
      // Default view: show all non-completed tasks
      result = result.filter(task => !task.completed);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortOption === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortOption === 'priority') {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    setFilteredTasks(result);
  }, [categoryName, filter, sortOption, tasks]);

  // Handle task completion toggle
  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    
    setTasks(updatedTasks);
    localStorage.setItem('syncwise_tasks', JSON.stringify(updatedTasks));
    
    const toggledTask = updatedTasks.find(t => t.id === taskId);
    toast({
      title: toggledTask.completed ? "Task completed" : "Task marked incomplete",
      description: toggledTask.title,
    });
  };

  // Handle task deletion
  const handleDeleteTask = (taskId) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    
    setTasks(updatedTasks);
    localStorage.setItem('syncwise_tasks', JSON.stringify(updatedTasks));
    
    toast({
      title: "Task deleted",
      description: taskToDelete.title,
    });
  };

  // Determine the page title
  const getPageTitle = () => {
    if (filter === 'completed') return 'Completed Tasks';
    if (filter === 'upcoming') return 'Upcoming Tasks';
    if (categoryName) return `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Tasks`;
    return 'All Tasks';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">{getPageTitle()}</h1>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal size={16} />
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOption('dueDate')}>
                Due Date {sortOption === 'dueDate' && <CheckCircle className="ml-2 h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('priority')}>
                Priority {sortOption === 'priority' && <CheckCircle className="ml-2 h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('title')}>
                Title {sortOption === 'title' && <CheckCircle className="ml-2 h-4 w-4" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <div className="rounded-full w-16 h-16 bg-slate-100 mx-auto flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-medium text-slate-800 mb-2">No tasks found</h3>
          <p className="text-slate-600 mb-6">
            {filter === 'completed' 
              ? "You haven't completed any tasks yet."
              : "You don't have any tasks in this category."}
          </p>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => navigate('/dashboard/new')}
          >
            Create New Task
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-200">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-4 hover:bg-slate-50">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleToggleComplete(task.id)}
                  className={`mt-1 h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    task.completed 
                      ? 'bg-indigo-500 border-indigo-500 text-white' 
                      : 'border-slate-300 hover:border-indigo-500'
                  }`}
                >
                  {task.completed && <CheckCircle className="h-4 w-4" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <Link 
                      to={`/dashboard/task/${task.id}`} 
                      className={`text-lg font-medium hover:text-indigo-600 ${
                        task.completed ? 'text-slate-500 line-through' : 'text-slate-800'
                      }`}
                    >
                      {task.title}
                    </Link>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={priorityColors[task.priority]}>
                        {task.priority}
                      </Badge>
                      <Badge className={categoryColors[task.category]}>
                        {task.category}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-white">
                          <DropdownMenuItem onClick={() => navigate(`/dashboard/edit/${task.id}`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <p className={`mt-1 text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                    {task.description}
                  </p>
                  
                  <div className="mt-2 flex items-center text-sm text-slate-500">
                    <Calendar className="mr-1.5 h-4 w-4" />
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
