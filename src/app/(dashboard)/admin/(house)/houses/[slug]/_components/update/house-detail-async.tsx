import { getHouseById } from "@/apis/house";
import React from "react";
import { FormUpdateHouse } from "./form-update-house";

type Props = {
  slug: string;
};
const HouseDetailAsync = async ({ slug }: Props) => {
  const response = await getHouseById(slug);
  return <FormUpdateHouse initialData={response.payload} />;
};

export default HouseDetailAsync;
