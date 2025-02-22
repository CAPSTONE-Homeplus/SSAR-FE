import { getOptionById } from "@/apis/option";
import { FormUpdateOption } from "@/app/(dashboard)/manager/services/[slug]/option/[optionId]/_components/update/form-update-option";
import React from "react";

type Props = {
  slug: string;
};
const OptionDetailAsync = async ({ slug }: Props) => {
  const response = await getOptionById(slug);

  return <FormUpdateOption initialData={response.payload} />;
};
 
export default OptionDetailAsync;
 