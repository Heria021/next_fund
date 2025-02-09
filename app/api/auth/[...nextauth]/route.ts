import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import axios from "axios";  

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/auth/signin", 
    },

    callbacks: {
        async signIn({ account, profile }) {
            if (!profile?.email) {
                throw new Error("No profile found");
            }

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
                    email: profile.email,
                }, {
                    headers: { "Content-Type": "application/json" },
                    maxBodyLength: Infinity,
                });

                console.log("API Response:", response.data);
            } catch (error) {
                console.error("Error sending user data:", error);
                throw new Error("User registration failed");
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
export const GET = handler;
export const POST = handler;