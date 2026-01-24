import { UseQueryResult, UseMutationResult, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type { UseQueryResult, UseMutationResult, UseQueryOptions, UseMutationOptions };

export type QueryOptions<TData, TError = Error> = Omit<
  UseQueryOptions<TData, TError>,
  'queryKey' | 'queryFn'
>;

export type MutationOptions<TData, TError = Error, TVariables = unknown> = Omit<
  UseMutationOptions<TData, TError, TVariables>,
  'mutationFn'
>;

export type QueryHook<TData, TError = Error> = () => UseQueryResult<TData, TError>;

export type MutationHook<TData, TError = Error, TVariables = unknown> = () => UseMutationResult<
  TData,
  TError,
  TVariables
>;

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
}
