import NextAuth from "next-auth";
import {prisma} from "@/app/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


const handler = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jhondoe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        const existingUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });
        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password ?? ""
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              email: existingUser.email,
            };
          }
          return null;
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(params) {
      if (!params.user.email) {
        return false;
      }
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: params.user.email,
          },
        });
        if (user) {
          return true;
        }
        await prisma.user.create({
          data: {
            email: params.user.email,
            firstName: params.user.name?.split(" ")[0],
            lastName: params.user.name?.split(" ")[1],
          },
        });
      } catch (error) {
        console.log("An error occurred", error);
      }
      return true;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
