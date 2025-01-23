import React from "react";
import AreaIndex from "./_components/area-index";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/lib/searchparams";
type pageProps = {
  searchParams: Promise<SearchParams>;
};

const AreaPage = async (props: pageProps) => {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });
  return <AreaIndex keyProps={key} />;
};

export default AreaPage;
