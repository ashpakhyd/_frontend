"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Layout } from "@/components/layout/layout";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Loader from "@/components/commonComponents/Loader/Loader";

export function Providers({ children, themeProps }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme="light"
        attribute="class"
        {...themeProps}
      >
        <Provider store={store}>
          <Layout>
            {" "}
            <React.Suspense
              fallback={
                <div>
                  <Loader />
                </div>
              }
            >
              {children}
            </React.Suspense>
          </Layout>
        </Provider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
