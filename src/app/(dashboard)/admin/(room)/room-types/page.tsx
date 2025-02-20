import React from "react";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { RoomTypeIndex } from "./_components";
type pageProps = {
  searchParams: Promise<SearchParams>;
};

const RoomTypesPage = async (props: pageProps) => {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });
  return <RoomTypeIndex keyProps={key} />;
};

export default RoomTypesPage;
