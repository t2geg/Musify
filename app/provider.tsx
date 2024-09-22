"use client"
import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}



// We can wrap in two ways one is directly wrap in layout.tsx but in that we have to
// make the layout.tsx for which we have to make it use client which has downsides
// thatwhy it is better to use a provider.tsx and wrap through that 
