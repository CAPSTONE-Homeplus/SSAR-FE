"use client";
import React from "react";
import TankStackProvider from "./tank-stack-provider";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ThemeProvider } from "@/providers/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AuthProvider } from "@/context/userContext";
const IndexProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsAdapter>
      <TankStackProvider>
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </Provider>
      </TankStackProvider>
    </NuqsAdapter>
  );
};

export default IndexProvider;
