'use client';
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

export default function Feed() {
	const [posts, setPosts] = useState(null);
	let tm;

	useEffect(() => {
		(async () => {
			const posts = await fetch(`/api/posts`, { cache: 'no-store' });
			setPosts(await posts.json());
		})();
	}, [])

	const handleChange = async (e) => {
		if (e.target.value == '') {
			if (tm) clearTimeout(tm);
			const posts = await fetch(`/api/posts`, { cache: 'no-store' });
			setPosts(await posts.json());
			return;
		}

		if (tm) clearTimeout(tm);

		tm = setTimeout(async () => {
			const posts = await fetch(`/api/posts?keyword=${e.target.value}`, { cache: 'no-store' });
			setPosts(await posts.json());
		}, 200);
	}

	return (
		<>
			<div className=" sm:max-w-[48rem] min-h-[1.5rem] place-items-center justify-center mx-auto mt-20 mb-10 px-6">
				<input onChange={handleChange} type="text" className="w-full bg-white rounded-lg text-shadow border-none border-pink-900 text-lg sm:text-xl font-semibold text-pink-600 px-3 py-3 placeholder:text-neutral-400 placeholder:font-semibold"
					placeholder="Search for a person or a word..." />
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-8 pb-4">
				{posts &&
					posts.map((post) =>
						<PostCard key={post.id} post={post} />
					)}
			</div>
		</>
	)
}
