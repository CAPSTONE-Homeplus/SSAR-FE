export const RootPath = {
  admin: "/admin",
  manager: "/manager",
  staff: "/staff",
};

export const PATHS = {
  admin: {
    dashboard: `${RootPath.admin}/dashboard`,
    stores: `${RootPath.admin}/stores`,
    shippers: `${RootPath.admin}/shippers`,
    areas: `${RootPath.admin}/areas`,
    revenue: {
      stores: `${RootPath.admin}/revenue/stores`,
      platform: `${RootPath.admin}/revenue/platform`,
    },
    settings: `${RootPath.admin}/settings`,
  },
  manager: {
    dashboard: `${RootPath.manager}/dashboard`,
    tasks: `${RootPath.manager}/tasks`,
    staffManagement: `${RootPath.manager}/staff-management`,
    areas: `${RootPath.manager}/areas`,
    revenue: `${RootPath.manager}/revenue`,
  },
  staff: {
    dashboard: `${RootPath.staff}/dashboard`,
    myTasks: `${RootPath.staff}/my-tasks`,
    schedule: `${RootPath.staff}/schedule`,
    guides: `${RootPath.staff}/guides`,
    feedback: `${RootPath.staff}/feedback`,
  },
};
