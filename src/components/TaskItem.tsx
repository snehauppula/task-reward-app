import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit?: (task: Task) => void;
}

export function TaskItem({ task, onToggle, onEdit }: TaskItemProps) {
  const priorityConfig = {
    low: { 
      color: 'text-emerald-700 dark:text-emerald-400', 
      bg: 'bg-emerald-100 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-800', 
      icon: Clock,
      dot: 'bg-emerald-500'
    },
    medium: { 
      color: 'text-amber-700 dark:text-amber-400', 
      bg: 'bg-amber-100 dark:bg-amber-900/20 border-amber-300 dark:border-amber-800', 
      icon: AlertTriangle,
      dot: 'bg-amber-500'
    },
    high: { 
      color: 'text-rose-700 dark:text-rose-400', 
      bg: 'bg-rose-100 dark:bg-rose-900/20 border-rose-300 dark:border-rose-800', 
      icon: Zap,
      dot: 'bg-rose-500'
    },
  };

  const config = priorityConfig[task.priority];
  const PriorityIcon = config.icon;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        task.completed
          ? 'bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-700 border-slate-200 dark:border-gray-600 opacity-90'
          : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm'
      }`}
    >
      {/* Priority indicator bar */}
      <div className={`absolute top-0 left-0 w-full h-1 ${task.completed ? 'bg-slate-300' : config.dot}`} />
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Task header */}
            <div className="flex items-center gap-3 mb-3">
              {task.completed && (
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
              )}
              
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold transition-all duration-200 ${
                    task.completed
                      ? 'text-gray-700 dark:text-gray-300 line-through'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className={`text-base mt-2 leading-7 ${
                    task.completed 
                      ? 'text-gray-600 dark:text-gray-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {task.description}
                  </p>
                )}
              </div>
            </div>

            {/* Task metadata */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Priority badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold border ${config.bg} ${config.color}`}>
                  <PriorityIcon className="w-3.5 h-3.5" />
                  <span className="capitalize">{task.priority}</span>
                </div>
                
                {/* Category */}
                {task.category && (
                  <span className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-full">
                    {task.category}
                  </span>
                )}
              </div>

              {/* Points */}
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
                task.completed 
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300' 
                  : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
              }`}>
                <span>+{task.points}</span>
                <span className="text-sm opacity-90">pts</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="ml-6 flex-shrink-0">
            {task.completed ? (
              <div className="text-center">
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-1 font-semibold">Completed</div>
                {task.completedAt && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(task.completedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onToggle(task.id)}
                className="group/btn relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                <div className="flex items-center gap-2">
                  <span>Complete</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </div>
                
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}