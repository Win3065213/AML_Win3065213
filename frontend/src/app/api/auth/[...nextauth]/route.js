import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("authorize", credentials)
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const res = await axios.post("http://localhost:8000/auth/login",
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.status === 200) {
            // Authorized
            const user = {
              id: res.data.user.id,
              email: res.data.user.email,
              role: res.data.user.role,
              jwt: res.data.token,
            };
            // console.log("Logged in user: ", user);
            // console.log("Logged in user: ", res);
            return user;
          }
        } catch (error) {
          // console.log('Authentication error:', error)
          if (error.response && error.status != 500) {
            // console.error("error response",error.response.data);
            throw new Error(error.response.data)
          } else {
            throw new Error("Connection error.");
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Prevent callbackUrl recursion
      const safeBaseUrl = new URL(baseUrl).origin; // e.g., http://localhost:3000

      // Parse the URL to check for recursive issues
      const parsedUrl = new URL(url, baseUrl);

      // Avoid appending if callbackUrl already exists
      const callbackUrl = parsedUrl.searchParams.get('callbackUrl');
      if (callbackUrl && callbackUrl.includes(baseUrl)) {
        return baseUrl; // Redirect to base URL if recursion is detected
      }
      
      // Allow internal URLs (from your app) to proceed
      if (url.startsWith(safeBaseUrl)) {
        return url;
      }
  
      // Allow relative paths like "/dashboard"
      if (url.startsWith("/")) {
        return `${safeBaseUrl}${url}`;
      }
  
      // Default to base URL if callbackUrl is external or invalid
      return safeBaseUrl;
    },
    async jwt({ token, user }) {
      // console.log("JWT Callback: ", token, user);
      // console.log("jwt success once: ",user);
      if (user) {
        token = {...token, ...user};
      }
      // console.log("completed once,user:", user)
      // console.log("token", token)
      return token;
    },
    async session({ session, token }) {
      // console.log("Session Callback: ", session, token);
      if (token) {
        // session.user.id = token.id
        // session.user.role = token.role
        session = {...session, ...token};
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
  },
  jwt: {
    maxAge: 30 * 60, // 30 minutes
  },
  pages: {
    signIn: '/authentication',
    error: '/authentication',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };