import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'MMM dd, yyyy')
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), 'MMM dd, yyyy HH:mm')
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    planning: 'bg-gray-500 text-white',
    active: 'bg-blue-500 text-white',
    'on-hold': 'bg-yellow-500 text-white',
    completed: 'bg-green-500 text-white',
    cancelled: 'bg-red-500 text-white',
    todo: 'bg-gray-500 text-white',
    'in-progress': 'bg-blue-500 text-white',
    review: 'bg-purple-500 text-white',
    done: 'bg-green-500 text-white',
  }
  return colors[status] || 'bg-gray-500 text-white'
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    low: 'text-green-700 bg-green-100 border-green-300',
    medium: 'text-yellow-700 bg-yellow-100 border-yellow-300',
    high: 'text-orange-700 bg-orange-100 border-orange-300',
    urgent: 'text-red-700 bg-red-100 border-red-300',
  }
  return colors[priority] || 'text-gray-700 bg-gray-100 border-gray-300'
}

export function generateColor(): string {
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function calculateBudgetPercentage(spent: number, budget: number): number {
  if (budget === 0) return 0
  return Math.round((spent / budget) * 100)
}
