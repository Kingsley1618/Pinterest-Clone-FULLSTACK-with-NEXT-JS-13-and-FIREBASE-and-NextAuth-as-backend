import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: "852484563088-vvg3nr04a8l3fpak8icu33f76fq13n8h.apps.googleusercontent.com",
          clientSecret: "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"
        })
      ]
})

export { handler as GET, handler as POST }