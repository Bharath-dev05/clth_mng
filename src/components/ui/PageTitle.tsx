import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
        {subtitle && <p className="text-neutral-500">{subtitle}</p>}
      </div>
      
      {action}
    </div>
  );
};

export default PageTitle;