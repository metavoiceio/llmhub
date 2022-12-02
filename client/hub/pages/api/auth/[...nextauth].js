import NextAuth from 'next-auth';
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions = {
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = parseInt(token.sub.split('|')[1]);
      return session;
    }
  },
  providers: [
    Auth0Provider({
      clientId: process.env.NEXT_AUTH0_CLIENT_ID,
      clientSecret: process.env.NEXT_AUTH0_CLIENT_SECRET,
      issuer: process.env.NEXT_AUTH0_ISSUER
    })
  ]
}

export default NextAuth(authOptions);
