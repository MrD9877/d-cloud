import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { tokenGenerator } from "../../utility/tokenGenerators";
import { User } from "@/schema/user";
import dbConnect from "../../utility/connectMongo";

export const maxDuration = 30;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async signIn({ user }) {
      const email = user.email?.trim().toLowerCase();
      const userName = user.name?.trim().toLowerCase();
      try {
        await dbConnect();
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
          const newUser = new User({ email, userName });
          await newUser.save();
        }
      } catch {
        return false;
      }
      const cookieStore = await cookies();
      const accessToken = await tokenGenerator({ email: user.email, userName: user.name }, "1d");
      const refreshToken = await tokenGenerator({ email: user.email, userName: user.name }, "50d");
      if (!accessToken || !refreshToken) return false;
      cookieStore.set("accessToken", accessToken);
      cookieStore.set("refreshToken", refreshToken);
      return true; // Continue with sign-in
    },
  },
  events: {
    async signOut() {
      const cookieStore = await cookies();
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
    },
  },
});

export { handler as GET, handler as POST };
