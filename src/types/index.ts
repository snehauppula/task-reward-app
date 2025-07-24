export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  points: number;
  createdAt: Date;
  completedAt?: Date;
  category?: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  type: 'virtual' | 'real-world' | 'achievement';
  icon: string;
  claimed: boolean;
  available: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetPoints: number;
  currentPoints: number;
  deadline?: Date;
  completed: boolean;
  tasks: string[];
}

export interface UserStats {
  totalPoints: number;
  dailyStreak: number;
  weeklyStreak: number;
  totalTasksCompleted: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
}

export interface Reminder {
  id: string;
  taskId: string;
  message: string;
  time: Date;
  read: boolean;
}