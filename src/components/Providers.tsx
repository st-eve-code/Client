"use client";

import type { ReactNode } from "react";
import { AgeVerification } from "./AgeVerification";
import { CurrencyProvider } from "./CurrencyProvider";
import { FavouritesProvider } from "./FavouritesProvider";

/** Wraps the app with all client-side context providers. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <CurrencyProvider>
      <FavouritesProvider>
        {children}
        <AgeVerification />
      </FavouritesProvider>
    </CurrencyProvider>
  );
}
