import connectDb from '@/dbconfig/dbconfig';
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import userAuth from "@/dbconfig/models/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


connectDb();

export const authOptions: AuthOptions = {

  providers: [

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await userAuth.findOne({ email: credentials?.email });
        if (!user) {
          return null
        }
        const comparePassword = await bcrypt.compare(credentials?.password!, user.password);
        if (!user && !comparePassword) {
          return null
        }
        return user;
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {

    async jwt({ token, user, profile }) {

      if (user || profile) {
        return {
          ...token,
          name : token.name ?? (user as any).userName,
          id: (user as any)._id,
          googleId: profile?.sub
        }
      }
      return token;
    },

    async session({ session, token }) {
      const { id, googleId, picture } = token
      return {
        ...session,
        picture,
        id: id,
        googleId: googleId
      }
    },



    async signIn({ account, profile }) {
      if (account!.provider === "google") {
        if (!(profile as any).email_verified && !(profile as any).email.endsWith("@gmail.com")) {
          return false;
        }
        const oldUser = await userAuth.findOne({ email: profile?.email })

        if (oldUser && oldUser.emailVerfied) {
          return true
        }

        if (oldUser && !oldUser.emailVerfied) {
          const updateGoogle = await userAuth.updateOne({ email: profile?.email }, {
            googleId: profile?.sub,
            emailVerfied: (profile as any).email_verified,
            picture : (profile as any).picture
          })

          return updateGoogle ? true : false
        }

        const googleData = new userAuth({
          userName: profile?.name,
          email: profile?.email,
          password: profile?.sub,
          googleId: profile?.sub,
          emailVerfied: (profile as any).email_verified,
          picture : (profile as any).picture
        })

        const saved = await googleData.save();
        if (saved) {
          return true
        }
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },


  },
  pages: {
    signIn: "/auth/login"
  }


}

const handler = NextAuth(authOptions)


export { handler as GET, handler as POST }