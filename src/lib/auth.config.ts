import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        name: { label: "Password", type: "password" },
        id: { label: "Id", type: "id" },
      },
      async authorize(credentials) {
        console.log("authorize", credentials)
        if (!credentials?.email || !credentials?.name || !credentials.id) {
          console.log("Email and name and id are required.");
          // throw new Error("Email and password are required.");
          return null;
        }

        // Mock user for now, replace with actual DB call
        const user: User = {
          id: credentials?.id,
          name: credentials.name,
          email: credentials.email as string
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    }),

  ],
  pages: {
    signIn: "/login" // Custom sign-in page
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      baseUrl=process.env.NEXT_PUBLIC_FRONTEND_URL;
      console.log(baseUrl)
      // Redirect to home page after logout
      return url.startsWith(baseUrl) ? url :`${baseUrl}/auth/login`;
    },
  },

  secret: process.env.NEXTAUTH_SECRET || "secret"
};


