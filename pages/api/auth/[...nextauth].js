import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { connectDB } from "../../../util/database";

export const authOptions = {

  providers: [
    CredentialsProvider({
      name: "credentials",
        credentials: {
          email: { label: "이메일", type: "text" },
          password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        let db = (await connectDB).db('workit');
        let user = await db.collection('user_cred').findOne({email : credentials.email})
        if (!user) {
          console.log('해당 이메일은 없음');
          return null
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null
        }
        return user
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
        token.user.age = user.age
        token.user.gender = user.gender
        token.user.height = user.height
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;  
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET  
};

export default NextAuth(authOptions); 