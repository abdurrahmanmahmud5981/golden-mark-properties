import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import Credentials from "next-auth/providers/credentials";
import { User } from "./models/User";
import connectDB from "./lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  ...(process.env.MONGODB_URI
    ? {
        adapter: MongoDBAdapter(clientPromise) as unknown as NextAuthOptions["adapter"],
      }
    : {}),
  providers: [
    Credentials({
      name: "ক্যাডেন্সিয়াল",
      credentials: {
        email: { label: "ইমেইল", type: "email" },
        password: { label: "পাসওয়ার্ড", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.password) return null;

        const isMatch = await bcrypt.compare(credentials.password as string, user.password);
        if (!isMatch) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        } as unknown as any; // Cast through unknown to satisfy Credentials return type
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id!;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
};

export const auth = () => getServerSession(authOptions);
export const { signIn, signOut } = { 
  signIn: () => {}, // In v4 context, these are usually client-side from next-auth/react
  signOut: () => {} 
};
