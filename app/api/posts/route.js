import prisma from "@/prisma/db";
import { postSchema } from "@/utils/validationSchemas";

export async function GET(req) {
	const params = new URL(req.url).searchParams;
	let posts;
	if (params.has('keyword')) {
		posts = await prisma.post.findMany({
			where: {
				OR: [
					{
						user: {
							username: {
								contains: params.get('keyword')
							}
						}
					},
					{
						word: {
							word: {
								contains: params.get('keyword')
							}
						}
					}
				]
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
	} else {
		posts = await prisma.post.findMany({
			include: {
				word: true,
				user: true,
				likes: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		});
	}
	return Response.json(posts, { status: 200 });
}

export async function POST(req) {
	const result = postSchema.safeParse(await req.json());
	if (!result.success) {
		return Response.json(result.error.format(), { status: 400 });
	}

	const newPost = await prisma.post.create({ data: result.data });

	return Response.json(newPost, { status: 201 });
}
