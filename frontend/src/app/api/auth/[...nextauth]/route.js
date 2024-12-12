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
          const res = await axios.post("http://localhost:8000/authentication/login",
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
            console.log("Logged in user: ", user);
            // console.log("Logged in user: ", res);
            return user;
          }
        } catch (error) {
          // put status unauthorised here
          console.log('Authentication error:', error)
        }
        return null;
      },
    }),
  ],
  callbacks: {
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
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };