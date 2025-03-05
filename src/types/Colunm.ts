/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

// Định nghĩa các filter types cụ thể
export type FilterType = "input" | "select" | "date" | "range" | "multiSelect";

// Định nghĩa option với generic type
export type Option<T = string> = {
  label: string;
  value: T;
  icon?: React.ComponentType<{
    className?: string;
  }>;
  disabled?: boolean;
  description?: string;
};

// Định nghĩa meta data chi tiết hơn
export type CustomColumnMeta<T = any> = {
  // Layout
  align?: "left" | "center" | "right";
  width?: number | string;
  fixed?: "left" | "right";

  // Filtering
  filterType?: FilterType;
  options?: Option<T>[];
  placeholder?: string;
  filterComponent?: React.ComponentType<{
    column: any;
    value: any;
    onChange: (value: any) => void;
  }>;

  // Sorting
  sortable?: boolean;
  defaultSortOrder?: "asc" | "desc";

  // Display
  ellipsis?: boolean;
  copyable?: boolean;
  format?: (value: T) => string;

  // Validation
  rules?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    message?: string;
  }[];
};

// Column definition chính
export type CustomColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  meta?: CustomColumnMeta<TValue>;
};
