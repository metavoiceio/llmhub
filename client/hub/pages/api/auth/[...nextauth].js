import NextAuth from 'next-auth';
import Auth0Provider from "next-auth/providers/auth0";
import { parseUserIdFromToken } from '../../../common/token';

export const authOptions = {
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = parseUserIdFromToken(token);
      return session;
    }
  },
  providers: [
    Auth0Provider({
      clientId: process.env.NEXT_AUTH0_CLIENT_ID,
      clientSecret: process.env.NEXT_AUTH0_CLIENT_SECRET,
      issuer: process.env.NEXT_AUTH0_ISSUER,
    })
  ]
}

export default NextAuth(authOptions);
