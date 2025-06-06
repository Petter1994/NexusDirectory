"use client";

import {ThemeProvider} from "next-themes";
import {HeroUIProvider} from "@heroui/system";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
                {children}
            </ThemeProvider>
        </HeroUIProvider>
    );
}
