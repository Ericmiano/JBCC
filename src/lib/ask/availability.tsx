import type { ReactNode } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { siteLinks } from "@/lib/jbcc-data";

const rootRoute = getRouteApi("__root__");

/** Whether Ask JBCC is configured on this server; the root route loads it once per visit. */
export function useAskAvailable(): boolean {
  return rootRoute.useLoaderData() === true;
}

/** Renders its children only while Ask JBCC is configured, so pages never mention a feature that can't answer. */
export function AskOnly({ children }: { children: ReactNode }) {
  return useAskAvailable() ? children : null;
}

/** Site navigation, without Ask JBCC while it isn't configured. */
export function useNavLinks() {
  const askAvailable = useAskAvailable();
  return askAvailable ? siteLinks : siteLinks.filter((link) => link.to !== "/ask");
}
