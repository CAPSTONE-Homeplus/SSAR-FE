import { Box, House } from "lucide-react";
import React from "react";
import PageContainer from "@/components/layout/page-container";
import { TabsPage } from "@/components/tabs-page";

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
    <PageContainer>
      <TabsPage tabs={tabs} />
      {children}
    </PageContainer>
  );
};

export default HouseLayout;
