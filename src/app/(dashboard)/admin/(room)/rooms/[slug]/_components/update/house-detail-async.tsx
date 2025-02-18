import React from "react";
import { FormUpdateRoom } from "./form-update-room";
import { getRoomById } from "@/apis/room";

type Props = {
  slug: string;
};
const HouseDetailAsync = async ({ slug }: Props) => {
  const response = await getRoomById(slug);
  return <FormUpdateRoom initialData={response.payload} />;
};

export default HouseDetailAsync;
