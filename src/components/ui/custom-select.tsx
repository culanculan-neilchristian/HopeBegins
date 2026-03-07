'use client';

import * as React from 'react';
import Select, {
  Props as SelectProps,
  GroupBase,
  StylesConfig,
} from 'react-select';
import { cn } from '@/lib/utils';

export interface CustomSelectOption {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

interface CustomSelectProps<
  Option = CustomSelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends SelectProps<Option, IsMulti, Group> {
  containerClassName?: string;
  error?: boolean;
}

export function CustomSelect<
  Option = CustomSelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  className,
  containerClassName,
  error,
  styles: customStyles,
  ...props
}: CustomSelectProps<Option, IsMulti, Group>) {
  const styles: StylesConfig<Option, IsMulti, Group> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'transparent',
      borderColor: error
        ? 'var(--destructive)'
        : state.isFocused
          ? 'var(--brand)'
          : 'var(--border)',
      borderRadius: 'var(--radius-xl)',
      minHeight: '2.5rem',
      boxShadow: state.isFocused ? '0 0 0 2px var(--brand-muted)' : 'none',
      '&:hover': {
        borderColor: error ? 'var(--destructive)' : 'var(--brand)',
      },
      transition: 'all 0.2s ease-in-out',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'var(--popover)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      boxShadow:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      zIndex: 50,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? 'var(--brand)'
        : state.isFocused
          ? 'var(--accent)'
          : 'transparent',
      color: state.isSelected
        ? 'var(--brand-foreground)'
        : 'var(--popover-foreground)',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      '&:active': {
        backgroundColor: 'var(--brand)',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: 'var(--foreground)',
      fontSize: '0.875rem',
      fontWeight: '600',
    }),
    placeholder: (base) => ({
      ...base,
      color: 'var(--muted-foreground)',
      fontSize: '0.875rem',
    }),
    input: (base) => ({
      ...base,
      color: 'var(--foreground)',
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: 'var(--brand-muted)',
      borderRadius: 'var(--radius-md)',
      color: 'var(--brand)',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'var(--brand)',
      fontWeight: '600',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'var(--brand)',
      '&:hover': {
        backgroundColor: 'var(--brand)',
        color: 'var(--brand-foreground)',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? 'var(--brand)' : 'var(--muted-foreground)',
      '&:hover': {
        color: 'var(--brand)',
      },
    }),
    ...customStyles,
  };

  return (
    <div className={cn('w-full', containerClassName)}>
      <Select
        className={cn('react-select-container', className)}
        classNamePrefix="react-select"
        styles={styles}
        {...props}
      />
    </div>
  );
}
