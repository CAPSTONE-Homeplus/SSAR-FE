import React from "react";
import HouseTypeDetailIndex from "./_components/house-type-detail-index";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/lib/searchparams";
type pageProps = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
};
const HouseTypeDetail = async (props: pageProps) => {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });
  return (
    <HouseTypeDetailIndex slug={(await props.params).slug} keyProps={key} />
  );
};

export default HouseTypeDetail;
