import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUrlParamChange } from "@/hooks/use-url";
interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  paginationProps: {
    page: number;
    limit: number;
    totalPage: number;
  };
}

export function DataTablePagination<TData>({
  table,
  paginationProps,
}: DataTablePaginationProps<TData>) {
  const { updateUrlParams, getCurrentParams } = useUrlParamChange();

  const handlePageChange = (newPageIndex: number) => {
    const params = getCurrentParams();

    // Cập nhật page
    updateUrlParams("page", newPageIndex);

    // Nếu đang ở page cuối và chuyển về page nhỏ hơn, giữ nguyên các filter và sort
    const currentSort = params.get("sort");
    const currentOrder = params.get("order");
    if (currentSort && currentOrder) {
      updateUrlParams("sort", currentSort);
      updateUrlParams("order", currentOrder);
    }

    // Giữ nguyên các filter hiện tại
    Array.from(params.entries())
      .filter(([key]) => key.startsWith("filter."))
      .forEach(([key, value]) => {
        updateUrlParams(key, value);
      });

    table.setPageIndex(newPageIndex - 1); // Điều chỉnh pageIndex vì API thường bắt đầu từ 1
  };

  const handlePageSizeChange = (newPageSize: number) => {
    const params = getCurrentParams();

    // Cập nhật limit
    updateUrlParams("limit", newPageSize);
    // Reset về trang 1 khi thay đổi limit
    updateUrlParams("page", 1);

    // Giữ nguyên các sort và filter
    const currentSort = params.get("sort");
    const currentOrder = params.get("order");
    if (currentSort && currentOrder) {
      updateUrlParams("sort", currentSort);
      updateUrlParams("order", currentOrder);
    }

    Array.from(params.entries())
      .filter(([key]) => key.startsWith("filter."))
      .forEach(([key, value]) => {
        updateUrlParams(key, value);
      });

    table.setPageSize(newPageSize);
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex-1">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between px-2 space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Phần hiển thị trên mobile */}
        <div className="flex flex-col items-center space-y-2 lg:hidden">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                handlePageChange(table.getState().pagination.pageIndex - 1)
              }
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Phần hiển thị trên md và lg */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => handlePageSizeChange(Number(value))}
            >
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder={paginationProps.limit} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm font-medium">
            Trang {paginationProps?.page} trong tổng{" "}
            {paginationProps?.totalPage}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(1)}
              disabled={paginationProps.page <= 1}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(paginationProps.page - 1)}
              disabled={paginationProps.page <= 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(paginationProps.page + 1)}
              disabled={paginationProps.page >= paginationProps.totalPage}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(paginationProps.totalPage)}
              disabled={paginationProps.page >= paginationProps.totalPage}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
