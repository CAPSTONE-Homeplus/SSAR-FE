import React from "react";
import BuildingIndex from "./_components/building-index";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/lib/searchparams";
type pageProps = {
  searchParams: Promise<SearchParams>;
};

const BuildingPage = async (props: pageProps) => {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });
  return <BuildingIndex keyProps={key} />;
};

export default BuildingPage;
