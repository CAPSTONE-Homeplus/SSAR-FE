import PageContainer from "@/components/layout/page-container";
import React, { Suspense } from "react";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heading } from "@/components/ui/headling";
import { Separator } from "@/components/ui/separator";
import StoreTableAction from "./store-tables/store-table-action";

const StoreIndex = () => {
  return (
    <PageContainer>
      {/* <div className="space-y-2">
        <StoreTable storeResponse={storeResponse} />
      </div> */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Cửa hàng"
            description="Quản lý cửa hàng (Chức năng bảng phía máy chủ.)"
          />
          {/* <Link
            href="/dashboard/product/new"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link> */}
        </div>
        <Separator />
        <StoreTableAction />
        <Suspense
          // key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          {/* <StoreTable /> */}
        </Suspense>
      </div>
    </PageContainer>
  );
};

export default StoreIndex;
