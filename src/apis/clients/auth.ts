import { httpLocal } from "@/lib/http";
import { TAuthResponse } from "@/schema/auth.schema";
const authClient = {
  auth: async (body: { user: TAuthResponse }) => {
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
