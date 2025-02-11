"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LogoutIcon from "@mui/icons-material/Logout";
import useUserStore from "@/store/userStore";
import { ArrowRight } from "lucide-react";
const UserHeader = () => {
  const { user, loadUserFromLocalStorage } = useUserStore();

  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

  const router = useRouter();

  return (
    <>
      {!user ? (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="relative text-xs sm:text-sm flex items-center gap-2 px-4 py-2 transition-all 
                 hover:border hover:border-gray-900 hover:p-0.5 hover:px-4 hover:py-2 
                 dark:hover:border-gray-300"
            onClick={() => router.push("/")}
          >
            Bắt Đầu Ngay
            <ArrowRight className="w-4 h-4" />
          </Button>

        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative  rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/03.png" alt="@shadcn" />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-50" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-xs leading-none text-muted-foreground">
                  Chào Mừng
                </p>
                <p className="text-sm font-bold leading-none">
                  {user.fullName ? user.fullName : user.username}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <PersonIcon style={{ marginRight: "8px" }} />
                Hồ Sơ
              </DropdownMenuItem>
              {user?.roleName === "admin" && (
                <DropdownMenuItem onClick={() => router.push("/admin/report")}>
                  <PersonIcon style={{ marginRight: "8px" }} />
                  Quản Lý
                </DropdownMenuItem>
              )}
              {user?.roleName === "user" && (
                <>
                  <DropdownMenuItem
                    onClick={() => router.push("/profile/orders")}
                  >
                    <HistoryIcon style={{ marginRight: "8px" }} />
                    Lịch Sử Mua Hàng
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/profile/customizes")}
                  >
                    <LocalMallIcon style={{ marginRight: "8px" }} />
                    Sản Phẩm Của Bạn
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/logout">
                <LogoutIcon style={{ marginRight: "8px" }} />
                Đăng Xuất
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default UserHeader;
