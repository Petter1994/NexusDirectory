"use client";

import {ThemeProvider} from "next-themes";
import {HeroUIProvider} from "@heroui/system";
import { SessionProvider } from "next-auth/react"

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
                <SessionProvider>
                {children}
                </SessionProvider>
            </ThemeProvider>
        </HeroUIProvider>
    );
}
