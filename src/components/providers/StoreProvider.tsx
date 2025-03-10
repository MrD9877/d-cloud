"use client";
import { store } from "@/redux/Silce";
import React from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: React.ReactElement }) {
  return <Provider store={store}>{children}</Provider>;
}
