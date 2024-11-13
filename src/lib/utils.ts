import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

/**
 * Hàm định dạng ngày theo format DD/MM/YYYY
 * @param date - Ngày cần định dạng (chuỗi hoặc đối tượng Date)
 * @returns Chuỗi ngày đã định dạng theo DD/MM/YYYY
 */
export const formatDate = (date: Date | string): string => {
  return format(new Date(date), "dd/MM/yyyy");
};
