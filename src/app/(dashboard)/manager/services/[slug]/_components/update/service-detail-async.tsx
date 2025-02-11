import React from "react";
import { FormUpdateService } from "@/app/(dashboard)/manager/services/[slug]/_components/update/form-update-service";
import { getServiceById } from "@/apis/service";

type Props = {
  slug: string;
};
const ServiceDetailAsync = async ({ slug }: Props) => {
  const response = await getServiceById(slug);
  return <FormUpdateService initialData={response.payload} />;
};

export default ServiceDetailAsync;
