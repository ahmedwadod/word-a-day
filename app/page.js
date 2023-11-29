import Feed from '@/components/Feed'

export default async function Home() {
	const response = await fetch("http://localhost:3000/api/word", { next: { revalidate: 0 } });
	const { word } = await response.json();
	const postsRes = await fetch("http://localhost:3000/api/posts", { cache: 'no-store' });
	const posts = await postsRes.json();

	return (
		<>
			<div className=' mt-24 flex flex-col place-items-center'>
				<h1 className='text-pink-600 text-6xl sm:text-8xl font-bold'>Word a Day</h1>
				<p className='mt-10 sm:max-w-[48rem] text-center text-pink-500 text-xl px-2 sm:text-2xl font-medium'>
					Word a Day is a social platform where you share your thoughts and ideas based on the daily word.
					Join us and share your thoughts about today’s word {' '}
					<span className='ext-pink-500 text-[1.5rem] font-bold'>#{word}</span>
				</p>
			</div>
			<Feed initalPosts={posts} />
		</>
	)
}
