import { getHouseTypeById } from "@/apis/house-type";
import React from "react";
import { FormUpdateHouseType } from "./form-update-house-type";

type Props = {
  slug: string;
};
const HouseTypeDetailAsync = async ({ slug }: Props) => {
  const response = await getHouseTypeById(slug);
  return <FormUpdateHouseType initialData={response.payload} />;
};

export default HouseTypeDetailAsync;
