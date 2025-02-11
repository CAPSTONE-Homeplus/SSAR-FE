"use client";

import { DataTableSearch } from "@/components/table/data-table-search";
import {
  CATEGORY_OPTIONS,
  useStoreTableFilters,
} from "./use-store-table-filters";
import { DataTableFilterBox } from "@/components/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/table/data-table-reset-filter";

export default function StoreTableAction() {
  const {
    categoriesFilter,
    setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useStoreTableFilters();
  return (
    <div className="flex flex-wrap items-center gap-4">
      <DataTableSearch
        searchKey="name"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTableFilterBox
        filterKey="categories"
        title="Categories"
        options={CATEGORY_OPTIONS}
        setFilterValue={setCategoriesFilter}
        filterValue={categoriesFilter}
      />
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
