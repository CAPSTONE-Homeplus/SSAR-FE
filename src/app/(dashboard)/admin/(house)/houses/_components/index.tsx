import React from "react";
// import PageContainer from "@/components/layout/page-container";
import HouseRender from "./house-render";
type Props = {
  keyProps: string;
};
export const HouseIndex = ({ keyProps }: Props) => {
  return <HouseRender keyProps={keyProps} />;
};
