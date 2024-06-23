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

export const getRating = (score: number) => {
  if (score < 0 || score > 100) {
    throw new Error('Score must be between 0 and 100');
  }

  if (score >= 0 && score <= 10) {
    return 'Needs Improvement';
  } else if (score > 10 && score <= 20) {
    return 'Poor';
  } else if (score > 20 && score <= 30) {
    return 'Fair';
  } else if (score > 30 && score <= 40) {
    return 'Below Average';
  } else if (score > 40 && score <= 50) {
    return 'Average';
  } else if (score > 50 && score <= 60) {
    return 'Above Average';
  } else if (score > 60 && score <= 70) {
    return 'Good';
  } else if (score > 70 && score <= 80) {
    return 'Very Good';
  } else if (score > 80 && score <= 90) {
    return 'Excellent';
  } else if (score > 90 && score <= 100) {
    return 'Outstanding';
  }
};
