import React, { memo } from 'react';
import { CardProps } from '../../types';

export const Card: React.FC<CardProps> = memo(({
  children,
  variant = 'default',
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = 'bg-white rounded-lg border border-neutral-200 transition-all duration-200';

  const variantStyles = {
    default: 'shadow-md',
    interactive: 'shadow-md hover:shadow-lg cursor-pointer'
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <div
      className={combinedStyles}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
