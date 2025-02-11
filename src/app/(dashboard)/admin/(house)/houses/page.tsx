import React from "react";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { HouseIndex } from "./_components";
type pageProps = {
  searchParams: Promise<SearchParams>;
};

const HousePage = async (props: pageProps) => {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });
  return <HouseIndex keyProps={key} />;
};

export default HousePage;
