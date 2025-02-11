import React from "react";
import PageContainer from "@/components/layout/page-container";
import RoomRender from "./room-render";
type Props = {
  keyProps: string;
};
export const RoomIndex = ({ keyProps }: Props) => {
  return (
    <PageContainer>
      <RoomRender keyProps={keyProps} />
    </PageContainer>
  );
};
