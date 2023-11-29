import AuthGuard from "@/components/AuthGuard";
import { getWord } from "../api/word/route";
import PostForm from "./form";

export default async function CreatePost() {
	const { word, id } = await getWord();

	return (
		<AuthGuard>
			<div className="mt-20 px-6 grid grid-cols-1 sm:grid-cols-2">
				<div className="flex flex-col">
					<h2 className="text-pink-600 text-4xl sm:text-[64px] font-bold">
						Create a Post
					</h2>
					<PostForm word={word} wordId={id} />
				</div>

				<div className="sm:block hidden" />
			</div>
		</AuthGuard>
	);
}
