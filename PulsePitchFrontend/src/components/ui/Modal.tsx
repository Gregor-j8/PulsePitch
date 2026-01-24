import React, { useEffect } from 'react';
import { ModalProps, ModalSubComponentProps } from '../../types';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-[1040] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className={`relative bg-white rounded-xl shadow-2xl w-full ${sizeStyles[size]} mx-4 max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
            <h2 className="text-2xl font-bold text-neutral-800">
              {title}
            </h2>
            <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-colors" aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export const ModalBody: React.FC<ModalSubComponentProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

export const ModalFooter: React.FC<ModalSubComponentProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-t border-neutral-200 flex gap-3 justify-end ${className}`}>
      {children}
    </div>
  );
};

export const ModalHeader: React.FC<ModalSubComponentProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b border-neutral-200 ${className}`}>
      {children}
    </div>
  );
};

export default Modal;