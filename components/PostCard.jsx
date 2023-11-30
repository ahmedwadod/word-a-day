'use client';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TimeAgo from 'react-timeago';

export default function PostCard({ post }) {
	const { data: session, status } = useSession();
	const [likes, setLikes] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(post.likes.some(l => l.userId == session?.user?.id));
	useEffect(() => {
		if (status == 'loading') return;
		setIsLiked(post.likes.some(l => l.userId == session?.user?.id))
	}, [status]);

	const handleLike = () => {
		if (!session?.user || session.user.id == post.userId) return;
		setLikes((prev) => isLiked ? prev - 1 : prev + 1);
		setIsLiked((prev) => !prev);
		fetch(`/api/posts/${!isLiked ? 'like' : 'dislike'}/${post.id}`);
	}


	return (
		<div className="flex flex-col min-h-[16rem] max-h-[25rem] sm:max-w-full max-w-[23rem] bg-white postcard-shadow px-4 py-4 rounded-lg">
			<Link className="flex flex-row gap-2" href={session?.user?.id == post.user.id ? '/profile' : `/profile/${post.user.id}`}>
				<Image alt="profile" src={post.user.image} width={56} height={32} className="rounded-full object-cover" />
				<div className="flex flex-col gap-1">
					<h3 className="text-pink-600 text-xl font-semibold">{post.user.name}</h3>
					<h4 className="text-neutral-500 text-base font-medium ">@{post.user.username}</h4>
				</div>
			</Link>

			<p className="mt-6 text-black text-base font-normal break-words">
				{post.body}
			</p>

			<div className="mt-auto flex justify-between place-items-end">
				<div className="flex gap-2 place-items-center pt-2">
					<p className="text-pink-600 text-lg font-bold">
						#{post.word.word}
					</p>
					<span className="text-neutral-400 font-normal"><TimeAgo date={post.createdAt} /></span>
				</div>
				<button onClick={handleLike} className="flex gap-2 place-items-center">
					<label className="text-pink-600">{likes}</label>
					<FontAwesomeIcon icon={isLiked ? faHeart : faHeartEmpty} className="text-lg text-pink-600" />
				</button>
			</div>
		</div>
	)
}
