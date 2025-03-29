
import React, { useState } from 'react';
import { ArrowLeft, Plus, ListChecks, Tag, Calendar, MoreHorizontal, Search, Bell, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@clerk/clerk-react';

// Demo tasks
const demoTasks = [
  { id: 1, title: 'Prepare project proposal', description: 'Complete draft for client review', priority: 'High', category: 'Work', dueDate: '2023-06-20', completed: false },
  { id: 2, title: 'Team meeting', description: 'Discuss project timeline and milestones', priority: 'Medium', category: 'Work', dueDate: '2023-06-21', completed: false },
  { id: 3, title: 'Review design mockups', description: 'Provide feedback on new UI designs', priority: 'Medium', category: 'Work', dueDate: '2023-06-19', completed: true },
  { id: 4, title: 'Grocery shopping', description: 'Buy ingredients for dinner party', priority: 'Low', category: 'Personal', dueDate: '2023-06-22', completed: false },
  { id: 5, title: 'Schedule dentist appointment', description: 'Annual checkup', priority: 'Low', category: 'Personal', dueDate: '2023-06-25', completed: false },
  { id: 6, title: 'Pay utility bills', description: 'Electricity and water due this week', priority: 'High', category: 'Personal', dueDate: '2023-06-18', completed: true },
];

const DemoPage = () => {
  const [tasks, setTasks] = useState(demoTasks);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-blue-100 text-blue-800',
  };

  const categoryColors = {
    Work: 'bg-indigo-100 text-indigo-800',
    Personal: 'bg-emerald-100 text-emerald-800',
  };

  const filteredTasks = tasks.filter(task => {
    // Apply category filter
    if (activeFilter !== 'All' && task.category !== activeFilter) {
      return false;
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return task.title.toLowerCase().includes(query) || 
             task.description.toLowerCase().includes(query);
    }
    
    return true;
  });

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-indigo-600 mr-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-semibold">Back to Home</span>
              </Link>
              <h1 className="text-xl font-bold text-slate-800">Syncwise Demo</h1>
            </div>
            <div>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={handleSignUp}
              >
                Sign Up for Free
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-1">
                <Button 
                  variant={activeFilter === 'All' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setActiveFilter('All')}
                  className={activeFilter === 'All' ? 'bg-indigo-600' : ''}
                >
                  All
                </Button>
                <Button 
                  variant={activeFilter === 'Work' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setActiveFilter('Work')}
                  className={activeFilter === 'Work' ? 'bg-indigo-600' : ''}
                >
                  Work
                </Button>
                <Button 
                  variant={activeFilter === 'Personal' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setActiveFilter('Personal')}
                  className={activeFilter === 'Personal' ? 'bg-indigo-600' : ''}
                >
                  Personal
                </Button>
              </div>
            </div>
            <Button className="w-full sm:w-auto flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
              <Plus size={18} />
              <span>Add Task</span>
            </Button>
          </div>

          {/* Task List */}
          <div>
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <ListChecks className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-1">No tasks found</h3>
                <p className="text-slate-500">
                  {searchQuery ? 'Try a different search term' : 'Add a task to get started'}
                </p>
              </div>
            ) : (
              <ul>
                {filteredTasks.map((task) => (
                  <li key={task.id} className={`border-b border-slate-200 p-4 hover:bg-slate-50 transition-colors ${task.completed ? 'bg-slate-50' : ''}`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="mt-1 h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className={`text-lg font-medium ${task.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                            {task.title}
                          </h3>
                          <div className="flex gap-2 flex-shrink-0">
                            <Badge className={priorityColors[task.priority]}>
                              {task.priority}
                            </Badge>
                            <Badge className={categoryColors[task.category]}>
                              {task.category}
                            </Badge>
                          </div>
                        </div>
                        <p className={`text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                          {task.description}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-slate-500">
                          <Calendar size={14} className="mr-1" />
                          Due: {task.dueDate}
                        </div>
                      </div>
                      <button className="p-1 text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-indigo-700 mb-3">This is a demo of Syncwise</h2>
          <p className="text-indigo-600 mb-6">Sign up for a free account to create your own tasks and access all features!</p>
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={handleSignUp}
          >
            Create Your Account
          </Button>
        </div>
      </main>
    </div>
  );
};

export default DemoPage;
