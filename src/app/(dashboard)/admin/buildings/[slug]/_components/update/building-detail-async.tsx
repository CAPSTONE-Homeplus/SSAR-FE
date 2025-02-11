import React from "react";
import { getBuildingById } from "@/apis/building";
import { FormUpdateBuilding } from "./form-update-building";

type Props = {
  slug: string;
};
const BuildingDetailAsync = async ({ slug }: Props) => {
  const response = await getBuildingById(slug);
  return <FormUpdateBuilding initialData={response.payload} />;
};

export default BuildingDetailAsync;
