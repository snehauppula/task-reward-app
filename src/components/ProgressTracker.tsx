import React from 'react';
import { Calendar, Flame, TrendingUp, Star, Trophy, Zap } from 'lucide-react';
import { UserStats } from '../types';

interface ProgressTrackerProps {
  stats: UserStats;
}

export function ProgressTracker({ stats }: ProgressTrackerProps) {
  const progressPercentage = (stats.xp / (stats.xp + stats.xpToNextLevel)) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl mb-4">
          <Trophy className="w-6 h-6 text-purple-500" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Progress
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Track your journey to success</p>
      </div>

      {/* Level Progress Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Level {stats.level}</h3>
              </div>
              <p className="text-blue-100 text-lg">
                {stats.xp} / {stats.xp + stats.xpToNextLevel} XP
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{stats.totalPoints}</div>
              <div className="text-blue-100">Total Points</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {stats.level + 1}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>
            <p className="text-blue-100 text-sm">
              {stats.xpToNextLevel} XP until next level
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Streak */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl">
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Daily Streak</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Consecutive days</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-orange-500 mb-2">
            {stats.dailyStreak}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Keep it up! 🔥
          </div>
        </div>

        {/* Weekly Streak */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl">
              <Calendar className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Weekly Streak</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Consecutive weeks</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-emerald-500 mb-2">
            {stats.weeklyStreak}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Amazing consistency! 📅
          </div>
        </div>

        {/* Total Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tasks Done</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">All time total</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-blue-500 mb-2">
            {stats.totalTasksCompleted}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            You're crushing it! 💪
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            This Week's Activity
          </h3>
        </div>
        
        <div className="flex items-end justify-between gap-3 h-40">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const height = Math.random() * 80 + 20; // Placeholder data
            const isToday = index === new Date().getDay() - 1;
            
            return (
              <div key={day} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full rounded-t-xl transition-all duration-500 hover:scale-105 ${
                    isToday 
                      ? 'bg-gradient-to-t from-purple-500 to-pink-500' 
                      : 'bg-gradient-to-t from-blue-400 to-blue-500'
                  }`}
                  style={{ height: `${height}%` }}
                />
                <span className={`text-sm mt-3 font-medium ${
                  isToday 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {day}
                </span>
                {isToday && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}