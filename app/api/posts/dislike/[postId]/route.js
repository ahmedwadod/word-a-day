import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
	const session = await getServerSession();
	if (!session?.user)
		return Response.json({ "error:": "You must sign in to do this action" }, { status: 403 });

	const post = await prisma.post.findUnique({
		where: {
			id: parseInt(params.postId)
		},
		include: {
			user: true,
			likes: true
		}
	});

	if (post.user.email == session.user.email)
		return Response.json({ "error": "Cannot perform a like/dislike action on own's post" }, { status: 400 });

	// Get the user of the session
	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email
		}
	})
	if (!post.likes.some((l) => l.userId == user.id)) return new Response('', { status: 200 });
	await prisma.like.deleteMany({
		where: {
			postId: post.id,
			userId: user.id
		}
	});

	return new Response('', { status: 201 });

}
