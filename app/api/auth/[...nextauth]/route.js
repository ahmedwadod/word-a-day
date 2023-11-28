import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			httpOptions: {
				timeout: 60000,
			}
		})
	],
	callbacks: {
		async session({ session }) {

		},
		async signIn({ profile }) {

		}
	}
});

export { handler as GET, handler as POST };
