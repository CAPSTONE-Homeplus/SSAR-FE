import { useRouter, useSearchParams } from "next/navigation";

/**
 * Utility functions to manage URL query parameters.
 */
export function useUrlParamChange() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Updates a URL query parameter.
   * @param key - The query parameter key to update.
   * @param value - The new value for the query parameter.
   */
  const updateUrlParams = (key: string, value: string | number | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, String(value)); // Convert value to string
    router.replace(`${window.location.pathname}?${params.toString()}`); // Update URL with new query params
  };

  /**
   * Retrieves the value of a URL query parameter.
   * @param key - The query parameter key to retrieve.
   * @returns The value of the query parameter or null if not present.
   */
  const getUrlParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  const getCurrentParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    console.log("params", params);
    return params;
  };

  /**
   * Deletes a URL query parameter.
   * @param key - The query parameter key to delete.
   */
  const deleteUrlParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.replace(`${window.location.pathname}?${params.toString()}`); // Update URL with new query params
  };

  /**
   * Cập nhật tham số sorting trong URL
   * @param column - Tên cột đang sort
   * @param direction - Hướng sort ('asc' hoặc 'desc')
   */
  const updateSortParams = (
    column: string,
    direction: "asc" | "desc" | null
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    if (direction) {
      params.set("sort", column);
      params.set("order", direction);
    } else {
      params.delete("sort");
      params.delete("order");
    }
    router.replace(`${window.location.pathname}?${params.toString()}`);
  };

  /**
   * Cập nhật tham số filter trong URL
   * @param filters - Object chứa các filter cần áp dụng
   */
  const updateFilterParams = (filters: Record<string, string[]>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Xóa tất cả filter cũ
    Array.from(params.keys())
      .filter((key) => key.startsWith("filter."))
      .forEach((key) => params.delete(key));

    // Thêm filter mới
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(`filter.${key}`, values.join(","));
      }
    });

    router.replace(`${window.location.pathname}?${params.toString()}`);
  };

  /**
   * Lấy các giá trị sorting hiện tại
   */
  const getCurrentSort = () => {
    return {
      column: searchParams.get("sort"),
      direction: searchParams.get("order") as "asc" | "desc" | null,
    };
  };

  /**
   * Lấy các giá trị filter hiện tại
   */
  const getCurrentFilters = () => {
    const filters: Record<string, string[]> = {};
    Array.from(searchParams.entries())
      .filter(([key]) => key.startsWith("filter."))
      .forEach(([key, value]) => {
        const filterKey = key.replace("filter.", "");
        filters[filterKey] = value.split(",");
      });
    return filters;
  };

  return {
    updateUrlParams,
    getUrlParam,
    deleteUrlParam,
    getCurrentParams,
    updateSortParams,
    updateFilterParams,
    getCurrentSort,
    getCurrentFilters,
  };
}
