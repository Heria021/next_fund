import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    session: { strategy: "jwt" },

    pages: { signIn: "/api/auth/signin" },

    callbacks: {
        async signIn({ profile }) {
            if (!profile?.email) return false;

            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
                    { email: profile.email },
                    {
                        headers: { "Content-Type": "application/json" },
                        timeout: 5000, // Timeout of 5 seconds
                    }
                );

                console.log("API Response:", response.data);
            } catch (error: any) {
                console.error("Error sending user data:", error?.message || error);
                return false;
            }

            return true;
        },

        async jwt({ token, account, user }) {
            if (account) {
                token.id = user?.id;
                token.accessToken = account.access_token;
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };