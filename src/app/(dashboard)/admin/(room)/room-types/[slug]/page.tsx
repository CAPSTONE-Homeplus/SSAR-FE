import React from "react";
import RoomTypeDetailIndex from "./_components/room-type-detail-index";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/lib/searchparams";
type pageProps = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
};
const RoomTypeDetail = async (props: pageProps) => {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });
  return (
    <RoomTypeDetailIndex slug={(await props.params).slug} keyProps={key} />
  );
};

export default RoomTypeDetail;
