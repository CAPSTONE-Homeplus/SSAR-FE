"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const TankStackProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TankStackProvider;