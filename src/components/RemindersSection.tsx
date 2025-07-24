import React from 'react';
import { Bell, Clock, AlertCircle } from 'lucide-react';
import { Reminder } from '../types';

interface RemindersSectionProps {
  reminders: Reminder[];
  onMarkAsRead: (id: string) => void;
}

export function RemindersSection({ reminders, onMarkAsRead }: RemindersSectionProps) {
  const unreadReminders = reminders.filter(r => !r.read);
  const readReminders = reminders.filter(r => r.read);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reminders</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {unreadReminders.length} unread notifications
          </p>
        </div>
        {unreadReminders.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-full">
            <Bell className="w-4 h-4" />
            <span className="font-semibold">{unreadReminders.length}</span>
          </div>
        )}
      </div>

      {/* Unread Reminders */}
      {unreadReminders.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Unread Notifications
          </h3>
          <div className="space-y-3">
            {unreadReminders.map(reminder => (
              <div
                key={reminder.id}
                className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">
                      {reminder.message}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(reminder.time).toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onMarkAsRead(reminder.id)}
                    className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors duration-200"
                  >
                    Mark as Read
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Read Reminders */}
      {readReminders.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recent Notifications
          </h3>
          <div className="space-y-3">
            {readReminders.slice(0, 5).map(reminder => (
              <div
                key={reminder.id}
                className="p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg opacity-75"
              >
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  {reminder.message}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(reminder.time).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reminders.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No reminders yet</p>
          <p className="text-gray-400 dark:text-gray-500">You'll see notifications for important tasks here</p>
        </div>
      )}
    </div>
  );
}