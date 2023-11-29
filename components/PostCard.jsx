import Image from "next/image";

export default function PostCard({ post }) {
	return (
		<div className="flex flex-col min-h-[16rem] sm:max-w-full max-w-[23rem] bg-white postcard-shadow px-4 py-4 rounded-lg">
			<div className="flex flex-row gap-2">
				<Image alt="profile" src={post.user.image} width={56} height={32} className="rounded-full object-cover" />
				<div className="flex flex-col gap-1">
					<h3 className="text-pink-600 text-xl font-semibold">{post.user.name}</h3>
					<h4 className="text-neutral-500 text-base font-medium ">@{post.user.username}</h4>
				</div>
			</div>

			<p className="mt-6 text-black text-base font-normal">
				{post.body}
			</p>

			<p className="relative mt-10 text-pink-600 text-lg font-bold ">
				#{post.word.word}
			</p>
		</div>
	)
}
