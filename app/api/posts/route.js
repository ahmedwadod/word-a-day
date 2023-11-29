import prisma from "@/prisma/db";
import { postSchema } from "@/utils/validationSchemas";

export async function GET() {
	const posts = await prisma.post.findMany({
		include: {
			word: true,
			user: true
		}
	});
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
