import React, { useState } from 'react';
import { Plus, Filter, Search, Sparkles } from 'lucide-react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export function TaskList({ tasks, onToggleTask, onAddTask }: TaskListProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    points: 10,
    category: '',
  });

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);
    
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesPriority && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    onAddTask({
      ...newTask,
      completed: false,
    });

    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      points: 10,
      category: '',
    });
    setShowAddForm(false);
  };

  const activeTasks = tasks.filter(t => !t.completed).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl mb-4">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
            Your Tasks
          </h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-xl leading-relaxed">
          {activeTasks === 0 ? 'All caught up! 🎉' : `${activeTasks} task${activeTasks === 1 ? '' : 's'} waiting for you`}
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 min-w-[120px]"
            >
              <option value="all">All Tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 min-w-[120px]"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Add Task Button */}
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white rounded-2xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-gray-700">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Create New Task</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="What needs to be done?"
                />
              </div>
              
              <div className="lg:col-span-2">
                <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base leading-6 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Add more details..."
                  rows={4}
                />
              </div>
              
              <div>
                <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Priority Level
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                  className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              
              <div>
                <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Reward Points
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newTask.points}
                  onChange={(e) => setNewTask({ ...newTask, points: parseInt(e.target.value) || 10 })}
                  className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="lg:col-span-2">
                <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Category
                </label>
                <input
                  type="text"
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Work, Personal, Health..."
                />
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white rounded-2xl font-semibold text-base transition-all duration-200 hover:shadow-lg"
              >
                Create Task
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold text-base transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-100 mb-2">
              {searchTerm || filter !== 'all' || priorityFilter !== 'all'
                ? 'No tasks match your filters'
                : 'Ready to get started?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              {searchTerm || filter !== 'all' || priorityFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Create your first task and start earning rewards!'}
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
            />
          ))
        )}
      </div>
    </div>
  );
}