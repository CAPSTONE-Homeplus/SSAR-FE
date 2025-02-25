import { getOptionById } from "@/apis/option";
import { FormUpdateExtraService } from "@/app/(dashboard)/manager/services/[slug]/extra-service/[extraServiceId]/_components/update/form-update-service-activity";
import React from "react";

type Props = {
  slug: string;
};
const ExtraServiceDetailAsync = async ({ slug }: Props) => {
  const response = await getOptionById(slug);

  return <FormUpdateExtraService initialData={response.payload} />;
};
 
export default ExtraServiceDetailAsync;
 