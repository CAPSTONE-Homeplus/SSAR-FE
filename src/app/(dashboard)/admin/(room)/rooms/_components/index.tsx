import React from "react";
import RoomRender from "./room-render";
type Props = {
  keyProps: string;
};
export const RoomIndex = ({ keyProps }: Props) => {
  return <RoomRender keyProps={keyProps} />;
};
