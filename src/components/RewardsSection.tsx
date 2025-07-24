import React, { useState } from 'react';
import { Gift, Plus, Sparkles } from 'lucide-react';
import { Reward } from '../types';
import { RewardCard } from './RewardCard';

interface RewardsSectionProps {
  rewards: Reward[];
  userPoints: number;
  onClaimReward: (id: string) => void;
  onAddReward: (reward: Omit<Reward, 'id' | 'claimed'>) => void;
}

export function RewardsSection({ rewards, userPoints, onClaimReward, onAddReward }: RewardsSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReward, setNewReward] = useState({
    title: '',
    description: '',
    cost: 50,
    type: 'real-world' as const,
    icon: 'gift',
  });

  const availableRewards = rewards.filter(r => !r.claimed);
  const claimedRewards = rewards.filter(r => r.claimed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReward.title.trim()) return;

    onAddReward({
      ...newReward,
      available: true,
    });

    setNewReward({
      title: '',
      description: '',
      cost: 50,
      type: 'real-world',
      icon: 'gift',
    });
    setShowAddForm(false);
  };

  const iconOptions = [
    { value: 'gift', label: '🎁 Gift' },
    { value: 'star', label: '⭐ Star' },
    { value: 'trophy', label: '🏆 Trophy' },
    { value: 'zap', label: '⚡ Zap' },
  ];

  const typeOptions = [
    { value: 'real-world', label: 'Real World', description: 'Physical rewards like coffee, treats, activities' },
    { value: 'virtual', label: 'Virtual', description: 'Digital rewards like app features, badges' },
    { value: 'achievement', label: 'Achievement', description: 'Milestone badges and recognition' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl mb-4">
          <Gift className="w-6 h-6 text-emerald-600" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Rewards Store
          </h2>
        </div>
        <p className="text-slate-600 dark:text-gray-400 text-lg mb-4">
          You have <span className="font-bold text-emerald-600">{userPoints} points</span> to spend
        </p>
        
        {/* Add Reward Button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-2xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Create Custom Reward</span>
        </button>
      </div>

      {/* Add Reward Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-slate-300 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100">Create Your Reward</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  Reward Title *
                </label>
                <input
                  type="text"
                  required
                  value={newReward.title}
                  onChange={(e) => setNewReward({ ...newReward, title: e.target.value })}
                  className="w-full px-4 py-4 border border-slate-300 dark:border-gray-600 rounded-2xl bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="What's your reward?"
                />
              </div>
              
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newReward.description}
                  onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
                  className="w-full px-4 py-4 border border-slate-300 dark:border-gray-600 rounded-2xl bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Describe your reward..."
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  Point Cost
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={newReward.cost}
                  onChange={(e) => setNewReward({ ...newReward, cost: parseInt(e.target.value) || 50 })}
                  className="w-full px-4 py-4 border border-slate-300 dark:border-gray-600 rounded-2xl bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  Icon
                </label>
                <select
                  value={newReward.icon}
                  onChange={(e) => setNewReward({ ...newReward, icon: e.target.value })}
                  className="w-full px-4 py-4 border border-slate-300 dark:border-gray-600 rounded-2xl bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500"
                >
                  {iconOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-3">
                  Reward Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {typeOptions.map(option => (
                    <label
                      key={option.value}
                      className={`relative p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                        newReward.type === option.value
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-emerald-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="rewardType"
                        value={option.value}
                        checked={newReward.type === option.value}
                        onChange={(e) => setNewReward({ ...newReward, type: e.target.value as any })}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className={`text-lg font-semibold mb-1 ${
                          newReward.type === option.value 
                            ? 'text-emerald-700 dark:text-emerald-300' 
                            : 'text-slate-900 dark:text-gray-100'
                        }`}>
                          {option.label}
                        </div>
                        <div className={`text-sm ${
                          newReward.type === option.value 
                            ? 'text-emerald-600 dark:text-emerald-400' 
                            : 'text-slate-600 dark:text-gray-400'
                        }`}>
                          {option.description}
                        </div>
                      </div>
                      {newReward.type === option.value && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-2xl font-semibold transition-all duration-200 hover:shadow-lg"
              >
                Create Reward
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-4 border-2 border-slate-300 dark:border-gray-600 text-slate-700 dark:text-gray-300 rounded-2xl hover:bg-slate-50 dark:hover:bg-gray-700 font-semibold transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Available Rewards */}
      {availableRewards.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <Gift className="w-5 h-5 text-emerald-600" />
            Available Rewards ({availableRewards.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRewards.map(reward => (
              <RewardCard
                key={reward.id}
                reward={reward}
                canClaim={userPoints >= reward.cost}
                onClaim={onClaimReward}
              />
            ))}
          </div>
        </div>
      )}

      {/* Claimed Rewards */}
      {claimedRewards.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Claimed Rewards ({claimedRewards.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {claimedRewards.map(reward => (
              <RewardCard
                key={reward.id}
                reward={reward}
                canClaim={false}
                onClaim={onClaimReward}
              />
            ))}
          </div>
        </div>
      )}

      {rewards.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-200 to-blue-200 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift className="w-12 h-12 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-100 mb-2">
            No rewards yet
          </h3>
          <p className="text-slate-500 dark:text-gray-400 mb-6">
            Create your first custom reward to motivate yourself!
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-2xl font-semibold transition-all duration-200 hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Create Your First Reward
          </button>
        </div>
      )}
    </div>
  );
}