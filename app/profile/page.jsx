import AuthGuard from "@/components/AuthGuard";
import PostCard from "@/components/PostCard";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";

export default async function MyProfile() {
	const session = await getServerSession();
	const user = await prisma.user.findUnique({
		where: {
			email: session.user?.email
		}
	});

	let posts;
	if (user) posts = await prisma.post.findMany({
		where: {
			user: {
				id: user.id
			}
		},
		include: {
			user: true,
			word: true,
			likes: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return <>
		<AuthGuard>
			<div className="mt-20 px-6">
				<h2 className="text-pink-600 text-4xl sm:text-[64px] font-bold">
					My Profile
				</h2>
				<h3 className="mt-6 text-pink-500 text-xl sm:text-2xl font-bold">@{user.username}</h3>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-10">
					{posts &&
						posts.map((post) =>
							<PostCard key={post.id} post={post} />
						)}
				</div>

			</div>
		</AuthGuard>
	</>
}
