import PostCard from "@/components/PostCard";
import prisma from "@/prisma/db";

export default async function MyProfile({ params }) {
	const user = await prisma.user.findUnique({
		where: {
			id: parseInt(params.userId)
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
		{user ?
			<div className="mt-20 px-6">
				<h2 className="text-pink-600 text-4xl sm:text-[64px] font-bold">
					{user.name}
				</h2>
				<h3 className="mt-6 text-pink-500 text-xl sm:text-2xl font-bold">@{user.username}</h3>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-10">
					{posts &&
						posts.map((post) =>
							<PostCard key={post.id} post={post} />
						)}
				</div>

			</div>
			: <div />
		}
	</>
}
