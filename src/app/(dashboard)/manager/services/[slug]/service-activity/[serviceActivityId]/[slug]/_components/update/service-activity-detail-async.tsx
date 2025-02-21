import React from "react";
import { FormUpdateServiceSubActivity } from "@/app/(dashboard)/manager/services/[slug]/service-activity/[serviceActivityId]/[slug]/_components/update/form-update-service-activity";
import { getServiceSubActivityById } from "@/apis/service-sub-activity";

type Props = {
  slug: string;
};
const ServiceSubActivityDetailAsync = async ({ slug }: Props) => {
  const response = await getServiceSubActivityById(slug);
  return <FormUpdateServiceSubActivity initialData={response.payload} />;
};

export default ServiceSubActivityDetailAsync;
