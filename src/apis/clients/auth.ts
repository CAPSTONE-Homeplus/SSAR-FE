/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpHomePlus } from "@/lib/http";
import { TLoginRequest } from "@/schema/auth.schema";
const authClient = {
  auth: async (body: { user: TLoginRequest }) => {
    return httpHomePlus.post("/auth/login", body);
  },
  logoutFromNextClientToNextServer: async (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) => {
    return httpHomePlus.post<any>(
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
