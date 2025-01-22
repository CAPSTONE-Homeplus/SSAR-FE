"use client";
import { TAccountResponse } from "@/schema/account.schema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  user: TAccountResponse | null;
  setUser: (user: TAccountResponse) => void;
  clearUser: () => void;
  loadUserFromLocalStorage: () => void;
}

// Khởi tạo userStore sử dụng Zustand
const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      // Hàm để set thông tin người dùng
      setUser: (user: TAccountResponse) => {
        set({ user });
      },

      // Hàm để xóa thông tin người dùng
      clearUser: () => {
        set({ user: null });
        localStorage.removeItem("user");
      },

      // Hàm để tải thông tin người dùng từ localStorage
      loadUserFromLocalStorage: () => {
        try {
          const userData = localStorage.getItem("user");
          if (userData) {
            const parsedUser = JSON.parse(userData) as TAccountResponse;
            set({ user: parsedUser });
          }
        } catch (error) {
          console.error("Error loading user from localStorage:", error);
        }
      },
    }),
    {
      name: "user-storage", // Tên của kho lưu trữ trong localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
