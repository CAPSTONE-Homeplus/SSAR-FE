"use client";

import { DataTableSearch } from "@/components/table/data-table-search";
import { useAreaTableFilters } from "./use-area-table-filters";
// import { DataTableFilterBox } from "@/components/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/table/data-table-reset-filter";

export default function AreaTableAction() {
  const {
    // categoriesFilter,
    // setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useAreaTableFilters();
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
