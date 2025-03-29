
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Tag, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const TaskForm = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const isEditing = !!taskId;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    category: 'Work',
  });
  
  const [loading, setLoading] = useState(false);

  // Load task data if editing
  useEffect(() => {
    if (isEditing) {
      const savedTasks = JSON.parse(localStorage.getItem('syncwise_tasks') || '[]');
      const taskToEdit = savedTasks.find(task => task.id === taskId);
      
      if (taskToEdit) {
        setFormData({
          title: taskToEdit.title,
          description: taskToEdit.description,
          dueDate: taskToEdit.dueDate,
          priority: taskToEdit.priority,
          category: taskToEdit.category,
        });
      } else {
        // Task not found
        toast({
          title: "Error",
          description: "Task not found",
          variant: "destructive",
        });
        navigate('/dashboard');
      }
    }
  }, [taskId, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simple validation
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      
      if (!formData.dueDate) {
        throw new Error('Due date is required');
      }
      
      // Get current tasks
      const savedTasks = JSON.parse(localStorage.getItem('syncwise_tasks') || '[]');
      
      if (isEditing) {
        // Update existing task
        const updatedTasks = savedTasks.map(task => 
          task.id === taskId 
            ? { 
                ...task, 
                ...formData,
                updatedAt: new Date().toISOString()
              } 
            : task
        );
        
        localStorage.setItem('syncwise_tasks', JSON.stringify(updatedTasks));
        
        toast({
          title: "Task updated",
          description: "Your task has been updated successfully.",
        });
      } else {
        // Create new task
        const newTask = {
          id: Date.now().toString(),
          ...formData,
          completed: false,
          createdAt: new Date().toISOString(),
        };
        
        const updatedTasks = [...savedTasks, newTask];
        localStorage.setItem('syncwise_tasks', JSON.stringify(updatedTasks));
        
        toast({
          title: "Task created",
          description: "Your new task has been created successfully.",
        });
      }
      
      // Navigate back to the dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          className="mr-4 p-0 h-auto"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-slate-800">
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </h1>
      </div>
      
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-base">Task Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="text-base">Description</Label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter task description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full h-24 px-3 py-2 border border-slate-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="dueDate" className="text-base">Due Date</Label>
              <div className="relative mt-1">
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>
            
            <div>
              <Label htmlFor="priority" className="text-base">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleSelectChange('priority', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="category" className="text-base">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditing ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
