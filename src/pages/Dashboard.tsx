import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import {
  Home,
  Plus,
  Calendar,
  Tag,
  Settings,
  CheckCircle,
  Clock,
  Search,
  Menu,
  X,
  MoreHorizontal,
  Edit,
  Trash,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import TaskList from "../components/dashboard/TaskList";
import TaskForm from "../components/dashboard/TaskForm";
import TaskDetails from "../components/dashboard/TaskDetails";

const Dashboard = () => {
  const { user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Load categories from localStorage on component mount
  useEffect(() => {
    const savedCategories = JSON.parse(
      localStorage.getItem("syncwise_categories") || "[]"
    );
    if (savedCategories.length === 0) {
      const defaultCategories = [
        { name: "work", color: "bg-indigo-600" },
        { name: "personal", color: "bg-emerald-600" },
      ];
      localStorage.setItem(
        "syncwise_categories",
        JSON.stringify(defaultCategories)
      );
      setCategories(defaultCategories);
    } else {
      setCategories(savedCategories);
    }
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      // Check if category already exists
      if (
        categories.some(
          (cat) => cat.name.toLowerCase() === newCategoryName.toLowerCase()
        )
      ) {
        toast({
          title: "Error",
          description: "Category already exists",
          variant: "destructive",
        });
        return;
      }

      const colors = [
        "bg-indigo-600",
        "bg-emerald-600",
        "bg-amber-600",
        "bg-rose-600",
        "bg-blue-600",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const newCategory = {
        name: newCategoryName.toLowerCase(),
        color: randomColor,
      };

      const updatedCategories = [...categories, newCategory];
      localStorage.setItem(
        "syncwise_categories",
        JSON.stringify(updatedCategories)
      );
      setCategories(updatedCategories);

      setNewCategoryName("");
      setShowCategoryInput(false);

      toast({
        title: "Category added",
        description: `${newCategoryName} category has been created.`,
      });
    }
  };

  const handleDeleteCategory = (categoryName) => {
    // Prevent deletion of default categories
    if (categoryName === "work" || categoryName === "personal") {
      toast({
        title: "Cannot delete",
        description: "Default categories cannot be deleted",
        variant: "destructive",
      });
      return;
    }

    const updatedCategories = categories.filter(
      (cat) => cat.name !== categoryName
    );
    localStorage.setItem(
      "syncwise_categories",
      JSON.stringify(updatedCategories)
    );
    setCategories(updatedCategories);

    toast({
      title: "Category deleted",
      description: `${categoryName} category has been removed.`,
    });

    // If currently viewing the deleted category, redirect to dashboard
    if (location.pathname === `/dashboard/category/${categoryName}`) {
      navigate("/dashboard");
    }
  };

  const toggleDeleteButtons = () => {
    setShowDeleteButtons((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 transform bg-white border-r border-slate-200 w-64 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:w-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between px-2 mb-6">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Syncwise
            </Link>
            {/* Fixed close button - now properly closes mobile menu */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSidebarOpen(false); // Also close sidebar on mobile
              }}
              className="p-1 rounded-md text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            <Link
              to="/dashboard"
              className={`flex items-center px-2 py-2 text-base font-medium rounded-md 
                ${
                  location.pathname === "/dashboard"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/dashboard/upcoming"
              className={`flex items-center px-2 py-2 text-base font-medium rounded-md 
                ${
                  location.pathname === "/dashboard/upcoming"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
            >
              <Clock className="mr-3 h-5 w-5" />
              Upcoming
            </Link>
            <Link
              to="/dashboard/completed"
              className={`flex items-center px-2 py-2 text-base font-medium rounded-md 
                ${
                  location.pathname === "/dashboard/completed"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
            >
              <CheckCircle className="mr-3 h-5 w-5" />
              Completed
            </Link>
            <div className="pt-4 pb-2">
              <div className="px-2 flex items-center justify-between">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Categories
                </h2>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setShowCategoryInput(!showCategoryInput)}
                  >
                    <Plus size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={toggleDeleteButtons}
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              </div>
              {showCategoryInput && (
                <div className="mt-2 px-2 flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="h-8 text-sm"
                  />
                  <Button size="sm" className="h-8" onClick={handleAddCategory}>
                    Add
                  </Button>
                </div>
              )}
            </div>
            {categories.map((category) => (
              <div
                key={category.name}
                className="group flex items-center justify-between"
              >
                <Link
                  to={`/dashboard/category/${category.name}`}
                  className={`flex-1 flex items-center px-2 py-2 text-base font-medium rounded-md 
                    ${
                      location.pathname ===
                      `/dashboard/category/${category.name}`
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                >
                  <span
                    className={`mr-3 h-2 w-2 rounded-full ${category.color}`}
                  ></span>
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </Link>
                {showDeleteButtons && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
                    onClick={() => handleDeleteCategory(category.name)}
                    disabled={
                      category.name === "work" || category.name === "personal"
                    }
                  >
                    <Trash size={14} />
                  </Button>
                )}
              </div>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center px-2 py-2">
              {user && (
                <div className="flex items-center flex-1 min-w-0">
                  <UserButton />
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-500 hover:bg-slate-100 lg:hidden"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="hidden lg:block">
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-md text-slate-500 hover:bg-slate-100"
                >
                  {isSidebarOpen ? (
                    <ChevronDown
                      size={20}
                      className="transform rotate-90 transition-transform"
                    />
                  ) : (
                    <Menu size={20} />
                  )}
                </button>
              </div>
              <div className="ml-4 relative w-64">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 ml-4"
                onClick={() => navigate("/dashboard/new")}
              >
                <Plus size={18} className="mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<TaskList filter={null} />} />
            <Route path="/upcoming" element={<TaskList filter="upcoming" />} />
            <Route
              path="/completed"
              element={<TaskList filter="completed" />}
            />
            <Route path="/category/:categoryName" element={<TaskList />} />
            <Route path="/new" element={<TaskForm />} />
            <Route path="/edit/:taskId" element={<TaskForm />} />
            <Route path="/task/:taskId" element={<TaskDetails />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
