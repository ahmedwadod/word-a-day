'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostForm({ word, wordId }) {
	const [postBody, setBody] = useState('');
	const [isSubmiting, setSubmiting] = useState(false);
	const [error, setError] = useState('');
	const { data: session } = useSession();
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmiting(true);
		setError('');
		const res = await fetch("http://localhost:3000/api/posts", {
			method: 'POST',
			body: JSON.stringify({
				userId: session.user.id,
				wordId: wordId,
				body: postBody,
			}),
			headers: {
				'Content-type': 'application/json'
			}
		});

		setSubmiting(false);
		if (res.status == 400) {
			const body = await res.json();
			setError(body.body._errors[0]);
		} else if (res.status == 201) {
			setError('');
			router.push('/');
		} else {
			setError('Unkown error happened');
		}
	}



	return <form className="mt-14 flex flex-col gap-2" onSubmit={handleSubmit}>
		<label className="text-pink-500 text-lg sm:text-xl font-normal">
			Today's Word:{' '}
			<span className="text-pink-500 sm:text-2xl text-xl font-bold">
				#{word}
			</span>
		</label>

		<textarea className="text-shadow rounded-lg p-4 resize-none placeholder:text-neutral-400 placeholder:font-bold"
			placeholder="What do you think about?"
			rows={7} maxLength={250} value={postBody} onChange={(e) => setBody(e.target.value)} />
		{error &&
			<label className="text-red-600">{error}</label>
		}

		<div className="flex gap-6 justify-end mt-4">
			<Link href='/' className="text-neutral-500 text-lg sm:text-2xl font-normal">Cancel</Link>
			<button type="submit" disabled={isSubmiting} className="text-pink-500 text-lg sm:text-2xl font-bold disabled:text-neutral-400">Post</button>

		</div>
	</form>

}
