import { getAreaById } from "@/apis/area";
import React from "react";
import { FormUpdateArea } from "./form-update-area";

type Props = {
  slug: string;
};
const AreaDetailAsync = async ({ slug }: Props) => {
  const response = await getAreaById(slug);
  return <FormUpdateArea initialData={response.payload} />;
};

export default AreaDetailAsync;
