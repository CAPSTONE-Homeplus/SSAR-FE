import { Box, House } from "lucide-react";
import React from "react";
import { TabsHouseIndex } from "./houses/_components/tabs-house-index";

const ServiceLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const tabs = [
    {
      value: "/manager/services/service-activities",
      label: (
        <>
          <House
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Căn hộ
        </>
      ),
    },
    {
      value: "/manager/services",
      label: (
        <>
          <Box
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Loại căn hộ
        </>
      ),
    },
  ];
  return (
    <>
      <TabsHouseIndex tabs={tabs} />
      {children}
    </>
  );
};

export default ServiceLayout;
