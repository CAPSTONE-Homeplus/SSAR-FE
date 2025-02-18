import { getRoomTypeById } from "@/apis/room-type";
import React from "react";
import { FormUpdateRoomType } from "./form-update-room-type";

type Props = {
  slug: string;
};
const RoomTypeDetailAsync = async ({ slug }: Props) => {
  const response = await getRoomTypeById(slug);
  return <FormUpdateRoomType initialData={response.payload} />;
};

export default RoomTypeDetailAsync;
