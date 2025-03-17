import React from "react";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import StaffAssignIndex from "@/app/(dashboard)/manager/revenue/_components/staff-assign-index";

type PageProps = {
  searchParams: SearchParams;
};

const StaffAssignPage = ({ searchParams }: PageProps) => {
  searchParamsCache.parse(searchParams); 

  const searchKey = serialize({ ...searchParams });

  return <StaffAssignIndex keyProps={searchKey} />;
};

export default StaffAssignPage;
