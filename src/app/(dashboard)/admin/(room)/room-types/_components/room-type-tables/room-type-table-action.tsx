"use client";

import { DataTableSearch } from "@/components/table/data-table-search";
import { useRoomTypeTableFilters } from "./use-room-type-table-filters";
// import { DataTableFilterBox } from "@/components/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/table/data-table-reset-filter";

export default function RoomTypeTableAction() {
  const {
    // categoriesFilter,
    // setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useRoomTypeTableFilters();
  return (
    <div className="flex flex-wrap items-center gap-4">
      <DataTableSearch
        searchKey="name"
        placeholder="Tìm kiếm tên khu vực"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      {/* <DataTableFilterBox
        filterKey="categories"
        title="Categories"
        options={CATEGORY_OPTIONS}
        setFilterValue={setCategoriesFilter}
        filterValue={categoriesFilter}
      /> */}
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
