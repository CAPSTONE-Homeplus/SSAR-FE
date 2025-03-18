// import cluster from "cluster";

export const RootPath = {
  admin: "/admin",
  manager: "/manager",
  staff: "/staff",
};

export const PATHS = {
  admin: {
    groups: `${RootPath.admin}/groups`,
    areas: `${RootPath.admin}/areas`,
    clusters: `${RootPath.admin}/clusters`,
    buildings: `${RootPath.admin}/buildings`,
    houses: `${RootPath.admin}/houses`,
    rooms: `${RootPath.admin}/rooms`,
    serviceCategories: `${RootPath.admin}/service-categories`,
    services: `${RootPath.admin}/services`,
  },
  
  manager: {
    groups: `${RootPath.manager}/groups`,
    timeSlots: `${RootPath.manager}/time-slots`,
    revenue: `${RootPath.manager}/revenue`,
  },
  staff: {
    myTasks: `${RootPath.staff}/my-tasks`,
    schedule: `${RootPath.staff}/schedule`,
    guides: `${RootPath.staff}/guides`,
    feedback: `${RootPath.staff}/feedback`,
  },
};
