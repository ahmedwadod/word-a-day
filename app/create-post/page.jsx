import AuthGuard from "@/components/AuthGuard";
import PostForm from "./form";

export default async function CreatePost() {
	const response = await fetch("http://localhost:3000/api/word", { next: { revalidate: 120 } });
	const { word, id } = await response.json();

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
