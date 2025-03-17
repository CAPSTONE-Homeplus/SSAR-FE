/* eslint-disable @typescript-eslint/no-unused-vars */

import { DataTable } from "@/components/table/data-table";
import { columns } from "./group-tables/columns";
import { searchParamsCache } from "@/lib/searchparams";
import { getAllGroups } from "@/apis/group";
import { cookies } from "next/headers";

const GroupTable = async () => {
  const page = searchParamsCache.get("page") ?? "1"; 
  const search = searchParamsCache.get("search") ?? "";
  const size = searchParamsCache.get("size") ?? "10"; 

  const filters = { page, size, ...(search && { search }) };

  let groupPayload;
  try {
    const groupResponse = await getAllGroups(filters);
    groupPayload = groupResponse?.payload ?? { items: [], totalPages: 0 };
  } catch (error) {
    console.error("Error fetching groups:", error);
    groupPayload = { items: [], totalPages: 0 };
  }

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  const userId = userCookie ? userCookie.value : null;
const finalData = groupPayload.items.map((item) => {
  return {
    ...item,
    userId: userId,
  };
}
);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Danh sách nhóm</h2>
      <DataTable
        data={finalData}
        columns={columns}
        totalItems={1}
      />
    </div>
  );
};

export default GroupTable;
