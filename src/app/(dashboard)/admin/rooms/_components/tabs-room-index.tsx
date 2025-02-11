"use client";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type TabItem = {
  value: string; // URL của tab
  label: React.ReactNode; // Node hiển thị trong tab
};

type Props = {
  classname?: string;
  tabs: TabItem[]; // Danh sách các tab được truyền từ bên ngoài
};

function TabsRoomIndex({ classname, tabs }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  console.log("Pathname:", pathname);
  // Kiểm tra và lọc những tab không có giá trị 'value'
  const validTabs = tabs.filter((tab) => tab.value === pathname);

  // Nếu không có tab hợp lệ thì không render gì
  if (validTabs.length === 0) {
    return null;
  }

  return (
    <Tabs defaultValue={pathname} onValueChange={(value) => router.push(value)}>
      <ScrollArea>
        <TabsList
          className={cn(
            "h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse",
            classname
          )}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Tabs>
  );
}

export { TabsRoomIndex };
