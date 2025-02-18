import React from "react";
import { getServiceActivityById } from "@/apis/service-activity";
import { FormUpdateServiceActivityInService } from "@/app/(dashboard)/manager/services/[slug]/service-activity/[serviceActivityId]/_components/update/form-update-service-activity";

type Props = {
  slug: string;
};
const ServiceActivityDetailInService = async ({ slug }: Props) => {
  const response = await getServiceActivityById(slug);
  return <FormUpdateServiceActivityInService initialData={response.payload} />;
};

export default ServiceActivityDetailInService;
