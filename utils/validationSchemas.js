import { number, string, z } from 'zod';

export const postSchema = z.object({
	userId: number("No user id"),
	wordId: number("No word of the day"),
	body: string().min(1, "Post body must not be empty").max(250, "Post body must not exceed 250 charachters")
});
