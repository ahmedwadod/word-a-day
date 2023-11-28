import PostCard from "./PostCard";

export default function Feed() {

	return (
		<>
			<div className=" sm:max-w-[48rem] min-h-[1.5rem] place-items-center justify-center mx-auto mt-20 mb-10 px-6">
				<input type="text" className="w-full bg-white rounded-lg text-shadow border-none border-pink-900 text-xl font-semibold text-pink-600 px-3 py-3 placeholder:text-neutral-400 placeholder:font-semibold"
					placeholder="Search for a person or a word..." />
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-8">
				<PostCard />
				<PostCard />
				<PostCard />
				<PostCard />
				<PostCard />
			</div>
		</>
	)
}
