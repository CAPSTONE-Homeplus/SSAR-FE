import React from "react";
import PageContainer from "@/components/layout/page-container";
import RoomTypeRender from "./room-type-render";
type Props = {
  keyProps: string;
};
export const RoomTypeIndex = ({ keyProps }: Props) => {
  return (
    <PageContainer>
      <RoomTypeRender keyProps={keyProps} />
    </PageContainer>
  );
};
