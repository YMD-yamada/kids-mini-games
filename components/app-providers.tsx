"use client";

import { SettingsProvider } from "@/components/providers/settings-provider";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>;
}
