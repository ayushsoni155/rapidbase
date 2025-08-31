import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import axios from "axios";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID, 
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // When user signs in with OAuth
    async signIn({ user, account, profile }) {
      try {
        const payload = {
          email: user.email,
          fullName: user.name || "",
          imageUrl: user.image || "",
          provider: account.provider,
          providerId: account.providerAccountId,
        };

        // Call your backend API
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/social-login`, payload);

        if (res.data?.success) {
          // Attach token to user object → goes into JWT
          user.backendToken = res.data.data.token;
          user.backendId = res.data.data.id;
        }
        return true;
      } catch (error) {
        console.error("Social login error:", error);
        return false; // deny login if API fails
      }
    },

    // Save token in NextAuth JWT
    async jwt({ token, user }) {
      if (user?.backendToken) {
        token.backendToken = user.backendToken;
        token.backendId = user.backendId;
      }
      return token;
    },

    // Expose backend token in session
    async session({ session, token }) {
      if (token?.backendToken) {
        session.user.backendToken = token.backendToken;
        session.user.backendId = token.backendId;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
