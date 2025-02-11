import { TNavItem } from "@/types/SideBar";
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  PieChart,
} from "lucide-react";
import { PATHS } from "../path";
export const data = {
  user: {
    name: "Nguyen Van A",

    email: "nguyenvana@gmail.com",

    avatar: "/avatars/shadcn.jpg",
  },

  teams: [
    {
      name: "ADMIN DASHBOARD",

      logo: GalleryVerticalEnd,

      plan: "HomePLus",
    },

    {
      name: "Acme Corp.",

      logo: AudioWaveform,

      plan: "Startup",
    },

    {
      name: "Evil Corp.",

      logo: Command,

      plan: "Free",
    },
  ],

  projects: [
    {
      name: "Design Engineering",

      url: "#",

      icon: Frame,
    },

    {
      name: "Sales & Marketing",

      url: "#",

      icon: PieChart,
    },

    {
      name: "Travel",

      url: "#",

      icon: Map,
    },
  ],
};
// **Navigation cho Admin**
export const adminNavItems: TNavItem[] = [
  {
    title: "Tổng quan",
    url: PATHS.admin.overview,
    icon: "dashboard",
    shortcut: ["d", "d"],
    isActive: false,
    items: [],
  },
  {
    title: "Quản lý cửa hàng",
    url: PATHS.admin.stores,
    icon: "store",
    shortcut: ["s", "t"],
    isActive: false,
    items: [],
  },
  {
    title: "Quản lý quản lý",
    url: PATHS.admin.managers,
    icon: "truck",
    shortcut: ["s", "h"],
    isActive: false,
    items: [],
  },
  {
    title: "Khu vực",
    url: "#",
    icon: "building",
    isActive: false,
    items: [
      {
        title: "Quản lí khu vực",
        url: PATHS.admin.areas,
        icon: "building",
        shortcut: ["r", "a"],
      },
      {
        title: "Quản lí cụm khu vực",
        url: PATHS.admin.clusters,
        icon: "building",
        shortcut: ["r", "s"],
      },
      {
        title: "Quản lí tòa nhà",
        url: PATHS.admin.buildings,
        icon: "building",
        shortcut: ["r", "p"],
      },
      {
        title: "Quản lí căn hộ",
        url: PATHS.admin.houses,
        icon: "home",
        shortcut: ["r", "p"],
      },
      {
        title: "Quản lí phòng",
        url: PATHS.admin.rooms,
        icon: "home",
        shortcut: ["r", "p"],
      },
    ],
  },

  {
    title: "Dịch vụ",
    url: PATHS.admin.services,
    icon: "package",
    isActive: false,
    items: [],
  },
  {
    title: "Doanh thu",
    url: "#",
    icon: "chart",
    isActive: false,
    items: [
      {
        title: "Doanh thu cửa hàng",
        url: PATHS.admin.revenue.stores,
        icon: "storeChart",
        shortcut: ["r", "s"],
      },
      {
        title: "Doanh thu nền tảng",
        url: PATHS.admin.revenue.platform,
        icon: "platformChart",
        shortcut: ["r", "p"],
      },
    ],
  },
  {
    title: "Cài đặt",
    url: PATHS.admin.settings,
    icon: "settings",
    shortcut: ["s", "e"],
    isActive: false,
    items: [],
  },
];

// **Navigation cho Manager**
export const managerNavItems: TNavItem[] = [
  {
    title: "Tổng quan",
    url: PATHS.manager.overview,
    icon: "dashboard",
    shortcut: ["d", "d"],
    isActive: false,
    items: [],
  },
  {
    title: "Phân Loại Dịch Vụ",
    url: PATHS.manager.serviceCategory,
    icon: "package",
    shortcut: ["t", "s"],
    isActive: false,
    items: [],
  },
  {
    title: "Dịch Vụ",
    url: PATHS.manager.service,
    icon: "package",
    shortcut: ["t", "s"],
    isActive: false,
    items: [],
  },
  {
    title: "Quản lý nhiệm vụ",
    url: PATHS.manager.tasks,
    icon: "tasks",
    shortcut: ["t", "s"],
    isActive: false,
    items: [],
  },
  {
    title: "Quản lý nhân sự",
    url: "#",
    icon: "users",
    shortcut: ["o", "s"],
    isActive: false,
    items: [
      {
        title: "Quản lý shipper",
        url: PATHS.manager.shippers,
        icon: "truck",
        shortcut: ["s", "h"],
        isActive: false,
        items: [],
      },
      {
        title: "Quản lý nhân viên",
        url: PATHS.manager.staffs,
        icon: "staff",
        shortcut: ["s", "m"],
        isActive: false,
        items: [],
      },
    ],
  },
  {
    title: "Khu vực",
    url: PATHS.manager.areas,
    icon: "building",
    isActive: false,
    items: [],
  },
  {
    title: "Doanh thu",
    url: PATHS.manager.revenue,
    icon: "chart",
    isActive: false,
    items: [],
  },
];

// **Navigation cho Staff**
export const staffNavItems: TNavItem[] = [
  {
    title: "Nhiệm vụ của tôi",
    url: PATHS.staff.myTasks,
    icon: "tasks",
    shortcut: ["m", "t"],
    isActive: false,
    items: [],
  },
  {
    title: "Lịch làm việc",
    url: PATHS.staff.schedule,
    icon: "calendar",
    shortcut: ["s", "c"],
    isActive: false,
    items: [],
  },
  {
    title: "Hướng dẫn",
    url: PATHS.staff.guides,
    icon: "info",
    isActive: false,
    items: [],
  },
  {
    title: "Phản hồi",
    url: PATHS.staff.feedback,
    icon: "feedback",
    shortcut: ["f", "b"],
    isActive: false,
    items: [],
  },
];

// Navigation cho Store (Cửa hàng)
export const storeNavItems: TNavItem[] = [
  {
    title: "Tổng quan",
    url: "/store/dashboard",
    icon: "dashboard",
    isActive: false,
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Sản phẩm",
    url: "#",
    icon: "box",
    isActive: false,
    items: [
      {
        title: "Tất cả sản phẩm",
        url: "/store/products",
        icon: "boxes",
        shortcut: ["p", "a"],
      },
      {
        title: "Thêm sản phẩm",
        url: "/store/products/add",
        icon: "plusBox",
        shortcut: ["p", "n"],
      },
      {
        title: "Danh mục",
        url: "/store/products/categories",
        icon: "category",
        shortcut: ["p", "c"],
      },
    ],
  },
  {
    title: "Đơn hàng",
    url: "#",
    icon: "boxes",
    isActive: false,
    items: [
      {
        title: "Tất cả đơn hàng",
        url: "/store/orders",
        icon: "list",
        shortcut: ["o", "a"],
      },
      {
        title: "Chờ xử lý",
        url: "/store/orders/pending",
        icon: "clock",
        shortcut: ["o", "p"],
      },
      {
        title: "Đang xử lý",
        url: "/store/orders/processing",
        icon: "loader",
        shortcut: ["o", "r"],
      },
      {
        title: "Hoàn thành",
        url: "/store/orders/completed",
        icon: "check",
        shortcut: ["o", "c"],
      },
    ],
  },
  {
    title: "Doanh thu",
    url: "/store/revenue",
    icon: "chart",
    shortcut: ["r", "e"],
    isActive: false,
    items: [],
  },
  {
    title: "Thông tin cửa hàng",
    url: "/store/profile",
    icon: "store",
    shortcut: ["s", "p"],
    isActive: false,
    items: [],
  },
];
