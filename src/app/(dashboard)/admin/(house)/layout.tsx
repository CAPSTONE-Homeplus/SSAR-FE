import { Box, House } from "lucide-react";
import React from "react";
import { TabsHouseIndex } from "./houses/_components/tabs-house-index";

const HouseLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const tabs = [
    {
      value: "/admin/houses",
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
      value: "/admin/house-types",
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

export default HouseLayout;
