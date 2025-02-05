import React from "react";
import AreaDetailIndex from "./_components/area-detail-index";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/lib/searchparams";
type pageProps = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
};
const AreaDetail = async (props: pageProps) => {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });
  return <AreaDetailIndex slug={(await props.params).slug} keyProps={key} />;
};

export default AreaDetail;
