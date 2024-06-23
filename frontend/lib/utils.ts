import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getColorForScore = (score: number, type = 'bg') => {
  const bgColors = [
    'bg-rose-600',
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-pink-500',
    'bg-purple-500',
    'bg-indigo-500',
    'bg-blue-500',
    'bg-cyan-500',
    'bg-emerald-500',
  ];

  const textColors = [
    'text-rose-600',
    'text-red-500',
    'text-orange-500',
    'text-amber-500',
    'text-pink-500',
    'text-purple-500',
    'text-indigo-500',
    'text-blue-500',
    'text-cyan-500',
    'text-emerald-500',
  ];

  if (score < 0 || score > 100) {
    throw new Error('Score must be between 0 and 100');
  }

  const index = Math.floor(score / 10);
  return type === 'bg' ? bgColors[index] : textColors[index];
};
