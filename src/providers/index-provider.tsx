"use client";
import React from "react";
import TankStackProvider from "./tank-stack-provider";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ThemeProvider } from "@/components/theme-provider";
const IndexProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TankStackProvider>
      <Provider store={store}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </Provider>
    </TankStackProvider>
  );
};

export default IndexProvider;
