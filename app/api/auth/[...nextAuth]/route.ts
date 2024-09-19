import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? ""
        }),

        GitHubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID ?? "",
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET ?? ""
        })
    ]
})

export { handler as GET, handler as POST }