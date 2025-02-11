import cluster from "cluster";

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
    clusters: `${RootPath.admin}/clusters`,
    buildings: `${RootPath.admin}/buildings`,
    houses: `${RootPath.admin}/houses`,
    rooms: `${RootPath.admin}/rooms`,
    services: `${RootPath.admin}/services`,
    revenue: {
      stores: `${RootPath.admin}/revenue/stores`,
      platform: `${RootPath.admin}/revenue/platform`,
    },
    settings: `${RootPath.admin}/settings`,
  },
  manager: {
    serviceCategory: `${RootPath.manager}/service-category`,
    service: `${RootPath.manager}/service`,
    serviceActivity: `${RootPath.manager}/service-activity`,
    serviceSubActivity: `${RootPath.manager}/service-sub-activity`,
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
