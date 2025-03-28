import React, { useState } from 'react';
import { FaUserCircle, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';

function Dashboard() {
  const defaultTasks = [
    {
      id: 1,
      title: "Website Redesign",
      description: "Update the company website with new branding",
      assignee: "Sarah Johnson",
      dueDate: "2024-02-15",
      status: "in-progress"
    },
    {
      id: 2,
      title: "Bug Fix - Login Page",
      description: "Fix authentication issues on the login page",
      assignee: "Mike Chen",
      dueDate: "2024-02-10",
      status: "pending"
    },
    {
      id: 3,
      title: "Client Presentation",
      description: "Prepare Q1 presentation for client meeting",
      assignee: "Emily Brown",
      dueDate: "2024-02-20",
      status: "pending"
    },
    {
      id: 4,
      title: "Database Optimization",
      description: "Improve database query performance",
      assignee: "David Wilson",
      dueDate: "2024-02-25",
      status: "completed"
    },
    {
      id: 5,
      title: "Mobile App Testing",
      description: "Conduct user testing for new mobile app features",
      assignee: "Lisa Anderson",
      dueDate: "2024-02-18",
      status: "in-progress"
    },
    {
      id: 6,
      title: "Security Audit",
      description: "Perform quarterly security review",
      assignee: "Tom Martinez",
      dueDate: "2024-02-28",
      status: "pending"
    },
    {
      id: 7,
      title: "Content Update",
      description: "Update blog posts and documentation",
      assignee: "Rachel Kim",
      dueDate: "2024-02-12",
      status: "completed"
    },
    {
      id: 8,
      title: "API Integration",
      description: "Integrate new payment gateway API",
      assignee: "James Taylor",
      dueDate: "2024-02-22",
      status: "in-progress"
    },
    {
      id: 9,
      title: "User Training",
      description: "Conduct training session for new team members",
      assignee: "Anna White",
      dueDate: "2024-02-16",
      status: "pending"
    },
    {
      id: 10,
      title: "Performance Review",
      description: "Complete Q1 performance evaluations",
      assignee: "Robert Garcia",
      dueDate: "2024-02-27",
      status: "pending"
    }
  ];

  const [tasks, setTasks] = useState(defaultTasks);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    status: 'pending'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.assignee) return;
    
    setTasks(prev => [...prev, { ...newTask, id: Date.now() }]);
    setNewTask({
      title: '',
      description: '',
      assignee: '',
      dueDate: '',
      status: 'pending'
    });
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'in-progress':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
  };

  const getStatusSummary = () => {
    const summary = {
      completed: tasks.filter(task => task.status === 'completed').length,
      'in-progress': tasks.filter(task => task.status === 'in-progress').length,
      pending: tasks.filter(task => task.status === 'pending').length
    };
    return summary;
  };

  const statusSummary = getStatusSummary();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-8 text-center">
          Team Task Tracker
        </h1>

        {/* Task Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-4 text-white text-center shadow-lg">
            <h3 className="text-lg font-semibold">Completed</h3>
            <p className="text-3xl font-bold">{statusSummary.completed}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg p-4 text-white text-center shadow-lg">
            <h3 className="text-lg font-semibold">In Progress</h3>
            <p className="text-3xl font-bold">{statusSummary['in-progress']}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg p-4 text-white text-center shadow-lg">
            <h3 className="text-lg font-semibold">Pending</h3>
            <p className="text-3xl font-bold">{statusSummary.pending}</p>
          </div>
        </div>
        
        {/* Add Task Form */}
        <form onSubmit={addTask} className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 mb-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Task Title</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Assignee</label>
              <input
                type="text"
                name="assignee"
                value={newTask.assignee}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>
          </div>
          
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-6 py-2 rounded-md hover:from-indigo-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200"
          >
            Add Task
          </button>
        </form>
        
        {/* Task List */}
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-blur-sm">
          {tasks.map(task => (
            <div
              key={task.id}
              className="border-b border-gray-200 p-6 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaUserCircle className="text-gray-400 text-2xl" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-500">Assigned to: {task.assignee}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                    className={`rounded-md px-3 py-1 ${getStatusColor(task.status)} transform hover:scale-105 transition-all duration-200`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-800 transform hover:scale-110 transition-all duration-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              {task.description && (
                <p className="mt-2 text-sm text-gray-600">{task.description}</p>
              )}
              
              {task.dueDate && (
                <p className="mt-2 text-sm text-gray-500">
                  Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                </p>
              )}
            </div>
          ))}
          
          {tasks.length === 0 && (
            <p className="text-center py-6 text-gray-500">No tasks yet. Add your first task above!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;