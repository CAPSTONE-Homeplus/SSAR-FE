import React from "react";
import { getClusterById } from "@/apis/cluster";
import { FormUpdateCluster } from "./form-update-cluster";

type Props = {
  slug: string;
};
const AreaDetailAsync = async ({ slug }: Props) => {
  const response = await getClusterById(slug);
  return <FormUpdateCluster initialData={response.payload} />;
};

export default AreaDetailAsync;
