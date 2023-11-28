export const dynamic = 'force-dynamic';

import prisma from '@/prisma/db';
import isDiffMoreThan24Hours from '@/utils/DiffInTime';
import { words } from '@/utils/words';

export async function GET() {
	const lastWord = await prisma.wordOfDay.findFirst({
		orderBy: {
			createdAt: 'desc'
		}
	});

	if (!lastWord || isDiffMoreThan24Hours(lastWord.createdAt, new Date())) {
		const count = await prisma.wordOfDay.count();
		const newWord = await prisma.wordOfDay.create({
			data: {
				word: words[count % words.length]
			}
		});

		return Response.json(newWord)
	}

	return Response.json(lastWord)

}
