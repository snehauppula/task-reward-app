import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { TaskList } from './components/TaskList';
import { RewardsSection } from './components/RewardsSection';
import { ProgressTracker } from './components/ProgressTracker';
import { GoalsSection } from './components/GoalsSection';
import { RemindersSection } from './components/RemindersSection';
import { Confetti } from './components/Confetti';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { Task, Reward, Goal, UserStats, Reminder } from './types';

// Initial data
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete morning workout',
    description: 'Go for a 30-minute jog in the park',
    priority: 'high',
    completed: false,
    points: 25,
    createdAt: new Date(),
    category: 'Health',
  },
  {
    id: '2',
    title: 'Review project documentation',
    description: 'Read through the new project requirements',
    priority: 'medium',
    completed: false,
    points: 15,
    createdAt: new Date(),
    category: 'Work',
  },
  {
    id: '3',
    title: 'Call mom',
    description: 'Weekly check-in call with family',
    priority: 'low',
    completed: true,
    points: 10,
    createdAt: new Date(),
    completedAt: new Date(),
    category: 'Personal',
  },
];

const initialRewards: Reward[] = [
  {
    id: '1',
    title: 'Coffee Break',
    description: 'Enjoy a premium coffee at your favorite cafe',
    cost: 50,
    type: 'real-world',
    icon: 'gift',
    claimed: false,
    available: true,
  },
  {
    id: '2',
    title: 'Achievement Badge',
    description: 'Early Bird - Complete 5 morning tasks',
    cost: 25,
    type: 'achievement',
    icon: 'trophy',
    claimed: false,
    available: true,
  },
  {
    id: '3',
    title: 'Movie Night',
    description: 'Watch a movie of your choice',
    cost: 75,
    type: 'real-world',
    icon: 'star',
    claimed: false,
    available: true,
  },
  {
    id: '4',
    title: 'Focus Booster',
    description: 'Unlock premium focus timer features',
    cost: 30,
    type: 'virtual',
    icon: 'zap',
    claimed: false,
    available: true,
  },
];

const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Fitness Champion',
    description: 'Complete 30 health-related tasks this month',
    targetPoints: 500,
    currentPoints: 25,
    completed: false,
    tasks: ['1'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
];

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', initialTasks);
  const [rewards, setRewards] = useLocalStorage<Reward[]>('rewards', initialRewards);
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', initialGoals);
  const [reminders, setReminders] = useLocalStorage<Reminder[]>('reminders', []);
  const [stats, setStats] = useLocalStorage<UserStats>('stats', {
    totalPoints: 10,
    dailyStreak: 1,
    weeklyStreak: 1,
    totalTasksCompleted: 1,
    level: 1,
    xp: 10,
    xpToNextLevel: 90,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  // Update stats when tasks change
  useEffect(() => {
    const completedTasks = tasks.filter(t => t.completed);
    const totalPoints = completedTasks.reduce((sum, task) => sum + task.points, 0);
    const xp = totalPoints;
    const level = Math.floor(xp / 100) + 1;
    const xpToNextLevel = level * 100 - xp;

    setStats({
      ...stats,
      totalPoints,
      totalTasksCompleted: completedTasks.length,
      level,
      xp,
      xpToNextLevel,
    });
  }, [tasks]);

  const handleToggleTask = (taskId: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedTask = {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date() : undefined,
          };
          
          // Show confetti when task is completed
          if (!task.completed && updatedTask.completed) {
            setShowConfetti(true);
          }
          
          return updatedTask;
        }
        return task;
      });
      
      return updatedTasks;
    });
  };

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, task]);
  };

  const handleClaimReward = (rewardId: string) => {
    setRewards(prevRewards => {
      return prevRewards.map(reward => {
        if (reward.id === rewardId && stats.totalPoints >= reward.cost) {
          // Deduct points when claiming reward
          setStats(prevStats => ({
            ...prevStats,
            totalPoints: prevStats.totalPoints - reward.cost,
          }));
          
          return {
            ...reward,
            claimed: true,
          };
        }
        return reward;
      });
    });
  };

  const handleAddReward = (newReward: Omit<Reward, 'id' | 'claimed'>) => {
    const reward: Reward = {
      ...newReward,
      id: Date.now().toString(),
      claimed: false,
    };
    setRewards(prev => [...prev, reward]);
  };

  const handleAddGoal = (newGoal: Omit<Goal, 'id'>) => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
    };
    setGoals(prev => [...prev, goal]);
  };

  const handleUpdateGoal = (goalId: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, ...updates } : goal
    ));
  };

  const handleMarkReminderAsRead = (reminderId: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId ? { ...reminder, read: true } : reminder
    ));
  };

  const unreadReminders = reminders.filter(r => !r.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        unreadReminders={unreadReminders}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'tasks' && (
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
          />
        )}

        {activeTab === 'rewards' && (
          <RewardsSection
            rewards={rewards}
            userPoints={stats.totalPoints}
            onClaimReward={handleClaimReward}
            onAddReward={handleAddReward}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressTracker stats={stats} />
        )}

        {activeTab === 'goals' && (
          <GoalsSection
            goals={goals}
            onAddGoal={handleAddGoal}
            onUpdateGoal={handleUpdateGoal}
          />
        )}

        {activeTab === 'reminders' && (
          <RemindersSection
            reminders={reminders}
            onMarkAsRead={handleMarkReminderAsRead}
          />
        )}
      </main>

      <Confetti
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />
    </div>
  );
}

export default App;