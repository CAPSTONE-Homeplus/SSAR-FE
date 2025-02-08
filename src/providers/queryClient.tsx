"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export function ReactQueryClientProvider({
  children,
}: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
