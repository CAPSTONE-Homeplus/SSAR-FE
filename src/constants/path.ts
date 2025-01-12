export const RootPath = {
  admin: "/admin",
  manager: "/manager",
  staff: "/staff",
};

export const PATHS = {
  admin: {
    overview: `${RootPath.admin}/overview`,
    stores: `${RootPath.admin}/stores`,
    managers: `${RootPath.admin}/managers`,
    areas: `${RootPath.admin}/areas`,
    revenue: {
      stores: `${RootPath.admin}/revenue/stores`,
      platform: `${RootPath.admin}/revenue/platform`,
    },
    settings: `${RootPath.admin}/settings`,
  },
  manager: {
    overview: `${RootPath.manager}/overview`,
    tasks: `${RootPath.manager}/tasks`,
    shippers: `${RootPath.manager}/shippers`,
    staffs: `${RootPath.manager}/staffs`,
    areas: `${RootPath.manager}/areas`,
    revenue: `${RootPath.manager}/revenue`,
  },
  staff: {
    // dashboard: `${RootPath.staff}/dashboard`,
    myTasks: `${RootPath.staff}/my-tasks`,
    schedule: `${RootPath.staff}/schedule`,
    guides: `${RootPath.staff}/guides`,
    feedback: `${RootPath.staff}/feedback`,
  },
};
