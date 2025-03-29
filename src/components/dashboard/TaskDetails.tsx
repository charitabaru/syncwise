
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Edit, 
  Trash, 
  CheckCircle, 
  AlertTriangle, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Priority and category styling
  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-blue-100 text-blue-800',
  };

  const categoryColors = {
    Work: 'bg-indigo-100 text-indigo-800',
    Personal: 'bg-emerald-100 text-emerald-800',
  };

  // Load task data
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('syncwise_tasks') || '[]');
    const foundTask = savedTasks.find(t => t.id === taskId);
    
    if (foundTask) {
      setTask(foundTask);
    } else {
      toast({
        title: "Error",
        description: "Task not found",
        variant: "destructive",
      });
      navigate('/dashboard');
    }
    
    setLoading(false);
  }, [taskId, navigate]);

  // Handle task completion toggle
  const handleToggleComplete = () => {
    const savedTasks = JSON.parse(localStorage.getItem('syncwise_tasks') || '[]');
    const updatedTasks = savedTasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    
    localStorage.setItem('syncwise_tasks', JSON.stringify(updatedTasks));
    setTask(prev => ({ ...prev, completed: !prev.completed }));
    
    toast({
      title: task.completed ? "Task marked as incomplete" : "Task completed",
      description: task.title,
    });
  };

  // Handle task deletion
  const handleDeleteTask = () => {
    const savedTasks = JSON.parse(localStorage.getItem('syncwise_tasks') || '[]');
    const updatedTasks = savedTasks.filter(t => t.id !== taskId);
    
    localStorage.setItem('syncwise_tasks', JSON.stringify(updatedTasks));
    
    toast({
      title: "Task deleted",
      description: "Your task has been permanently deleted.",
    });
    
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading task details...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center p-8">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Task Not Found</h2>
        <p className="text-slate-600 mb-6">The task you're looking for doesn't exist or has been deleted.</p>
        <Button 
          onClick={() => navigate('/dashboard')}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  // Check if task is overdue
  const isOverdue = () => {
    if (task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          className="mr-2 p-0 h-auto"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-slate-800 mr-auto">Task Details</h1>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate(`/dashboard/edit/${taskId}`)}
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <Trash className="h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this task. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleDeleteTask}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <button
              onClick={handleToggleComplete}
              className={`mt-1 h-6 w-6 rounded-full border flex items-center justify-center flex-shrink-0 ${
                task.completed 
                  ? 'bg-indigo-500 border-indigo-500 text-white' 
                  : 'border-slate-300 hover:border-indigo-500'
              }`}
            >
              {task.completed && <CheckCircle className="h-4 w-4" />}
            </button>
            
            <div className="flex-1">
              <h2 className={`text-2xl font-bold ${task.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                {task.title}
              </h2>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className={priorityColors[task.priority]}>
                  Priority: {task.priority}
                </Badge>
                <Badge className={categoryColors[task.category]}>
                  {task.category}
                </Badge>
                {isOverdue() && (
                  <Badge className="bg-red-100 text-red-800">
                    Overdue
                  </Badge>
                )}
                {task.completed && (
                  <Badge className="bg-emerald-100 text-emerald-800">
                    Completed
                  </Badge>
                )}
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center text-slate-600">
                  <Calendar className="h-5 w-5 mr-2 text-slate-500" />
                  <span>Due date: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-slate-600">
                  <Clock className="h-5 w-5 mr-2 text-slate-500" />
                  <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              {task.description && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Description</h3>
                  <div className={`p-4 bg-slate-50 rounded-md ${task.completed ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                    {task.description.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <Button
            className={`${
              task.completed 
                ? 'bg-slate-600 hover:bg-slate-700' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            onClick={handleToggleComplete}
          >
            {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
