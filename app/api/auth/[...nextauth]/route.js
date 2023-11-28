import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/prisma/db';

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
			const user = await prisma.user.findUnique({
				where: {
					email: session.user?.email
				}
			});

			session.user.id = user.id;

			return session;
		},
		async signIn({ profile }) {
			try {
				const user = await prisma.user.findUnique({
					where: {
						email: profile.email
					}
				});

				if (!user) {
					await prisma.user.create({
						data: {
							name: profile.name,
							email: profile.email,
							username: profile.email.substring(0, profile.email.indexOf('@')),
							image: profile.picture
						}
					});
				}

				return true;
			} catch (error) {
				console.log(error);
				return false;
			}

		}
	}
});

export { handler as GET, handler as POST };
