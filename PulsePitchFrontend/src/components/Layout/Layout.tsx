// @ts-nocheck
import React from 'react';
import { LayoutProps } from '../../types';

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant = 'default',
  className = ''
}) => {
  const baseClasses = 'navbar-offset min-h-screen';

  const variantClasses = {
    default: 'max-w-7xl mx-auto px-4 py-6',
    centered: 'flex items-center justify-center px-4',
    'full-width': 'w-full px-4 py-6'
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

export default Layout;
