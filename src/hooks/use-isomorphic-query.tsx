import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

const useIsomorphicQuery =
  typeof window === "undefined" ? useQuery : useSuspenseQuery;
export default useIsomorphicQuery;
