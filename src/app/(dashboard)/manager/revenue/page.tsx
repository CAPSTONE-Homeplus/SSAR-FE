import React from "react";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import StaffAssignIndex from "@/app/(dashboard)/manager/revenue/_components/staff-assign-index";
type pageProps = {
  searchParams: Promise<SearchParams>;
};

const StaffAssignPage = async (props: pageProps) => {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });
  return <StaffAssignIndex keyProps={key} />;
};

export default StaffAssignPage;
