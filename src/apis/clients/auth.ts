import { httpLocal } from "@/lib/http";
const authClient = {
  auth: async (body: { user: any }) => {
    return httpLocal.post("/api/auth", body);
  },
  logoutFromNextClientToNextServer: async (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) => {
    return httpLocal.post<any>(
      "/api/auth/logout",
      {
        force,
      },
      {
        baseUrl: "",
        signal,
      }
    );
  },
};
export default authClient;
