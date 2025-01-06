import React from "react";
import { CredenzaCreateArea } from "./_components/credenza-create-area";
import { CredenzaUpdateArea } from "./_components/credenza-update-area";
import { TAreaRequest } from "@/schema/area.schema";

const AreaPage = () => {
  const fakeData: TAreaRequest = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    areaName: "Test Area",
    description: "This is a test area",
    status: "ACTIVE",
  };
  return (
    <div>
      <CredenzaCreateArea />
      <CredenzaUpdateArea initialData={fakeData} />
    </div>
  );
};

export default AreaPage;
