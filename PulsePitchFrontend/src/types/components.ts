import { ReactNode } from 'react';
import { UserProfileDTO } from './dtos';

export interface LoggedInUserProps {
  loggedInUser: UserProfileDTO | null;
  setLoggedInUser: (user: UserProfileDTO | null) => void;
  refreshLoggedInUser: () => Promise<void>;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
}

export interface ModalSubComponentProps {
  children: ReactNode;
  className?: string;
}

export type ButtonVariant = 'primary' | 'success' | 'danger' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string | number; label: string }>;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export type CardVariant = 'default' | 'interactive';

export interface CardProps {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export type LayoutVariant = 'default' | 'centered' | 'full-width';

export interface LayoutProps {
  variant?: LayoutVariant;
  children: ReactNode;
  className?: string;
}

export interface AuthorizedRouteProps {
  loggedInUser: UserProfileDTO | null;
  roles?: string[];
  children: ReactNode;
}
