import React from 'react';
import { InputProps, SelectProps, TextareaProps } from '../../types';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  const inputStyles = `
    w-full px-4 py-2 rounded-lg border
    ${error
      ? 'border-danger-500 focus:ring-danger-500 focus:border-danger-500'
      : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'
    }
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:bg-neutral-100 disabled:cursor-not-allowed
    transition-colors duration-200
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={inputStyles}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger-600">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options = [],
  className = '',
  ...props
}) => {
  const selectStyles = `
    w-full px-4 py-2 rounded-lg border
    text-neutral-900 bg-white
    ${error
      ? 'border-danger-500 focus:ring-danger-500 focus:border-danger-500'
      : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'
    }
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:bg-neutral-100 disabled:cursor-not-allowed
    transition-colors duration-200
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={selectStyles}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-neutral-900 bg-white">
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-danger-600">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  const textareaStyles = `
    w-full px-4 py-2 rounded-lg border
    ${error
      ? 'border-danger-500 focus:ring-danger-500 focus:border-danger-500'
      : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'
    }
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:bg-neutral-100 disabled:cursor-not-allowed
    transition-colors duration-200
    resize-vertical
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        className={textareaStyles}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger-600">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
