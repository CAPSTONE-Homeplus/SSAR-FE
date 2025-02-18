import React from "react";
import { FormUpdateServiceActivity } from "@/app/(dashboard)/manager/services/[slug]/_components/list-service-activities-in-service/[slug]/_components/update/form-update-service-activity";
import { getServiceActivityById } from "@/apis/service-activity";

type Props = {
  slug: string;
};
const ServiceActivityDetailAsync = async ({ slug }: Props) => {
  const response = await getServiceActivityById(slug);
  return <FormUpdateServiceActivity initialData={response.payload} />;
};

export default ServiceActivityDetailAsync;
