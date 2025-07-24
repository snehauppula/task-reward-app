import React from 'react';
import { Gift, Star, Trophy, Zap } from 'lucide-react';
import { Reward } from '../types';

interface RewardCardProps {
  reward: Reward;
  canClaim: boolean;
  onClaim: (id: string) => void;
}

export function RewardCard({ reward, canClaim, onClaim }: RewardCardProps) {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      gift: Gift,
      star: Star,
      trophy: Trophy,
      zap: Zap,
    };
    const Icon = icons[iconName] || Gift;
    return <Icon className="w-6 h-6" />;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'virtual':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300';
      case 'real-world':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'achievement':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div
      className={`relative p-6 rounded-xl border transition-all duration-200 hover:shadow-md ${
        reward.claimed
          ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-75'
          : canClaim
          ? 'bg-white dark:bg-gray-800 border-blue-300 dark:border-blue-600 shadow-sm'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}
    >
      {reward.claimed && (
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
            <Star className="w-3 h-3" />
            Claimed
          </div>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${canClaim && !reward.claimed ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
          {getIcon(reward.icon)}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`font-semibold ${reward.claimed ? 'text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
              {reward.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(reward.type)}`}>
              {reward.type.replace('-', ' ')}
            </span>
          </div>

          <p className={`text-sm mb-4 ${reward.claimed ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
            {reward.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${reward.claimed ? 'text-gray-400' : 'text-blue-600 dark:text-blue-400'}`}>
                {reward.cost} points
              </span>
            </div>

            <button
              onClick={() => onClaim(reward.id)}
              disabled={!canClaim || reward.claimed}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                reward.claimed
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  : canClaim
                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {reward.claimed ? 'Claimed' : canClaim ? 'Claim' : 'Not Available'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}