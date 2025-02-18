import React from "react";
import HouseDetailIndex from "./_components/house-detail-index";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/lib/searchparams";
type pageProps = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
};
const HouseDetail = async (props: pageProps) => {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });
  return <HouseDetailIndex slug={(await props.params).slug} keyProps={key} />;
};

export default HouseDetail;
