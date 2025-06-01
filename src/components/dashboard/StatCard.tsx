import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend,
  className = ''
}) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-neutral-100 ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold text-neutral-900">
            {typeof value === 'number' && !title.toLowerCase().includes('items') ? 
              value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }) : 
              value}
          </h3>
          
          {trend && (
            <div className="mt-1 flex items-center">
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? 'text-success-600' : 'text-error-600'
                }`}
              >
                {trend.isPositive ? '+' : ''}
                {trend.value}%
              </span>
              <span className="ml-1 text-xs text-neutral-500">from last period</span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-primary-50">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;