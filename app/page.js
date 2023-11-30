export const dynamic = 'force-dynamic';

import Feed from '@/components/Feed'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { getWord } from './api/word/route';

export default async function Home() {
	const { word } = await getWord();
	const session = await getServerSession();

	return (
		<>
			<div className=' mt-24 flex flex-col place-items-center'>
				<h1 className='text-pink-600 text-6xl sm:text-8xl font-bold'>Word a Day</h1>
				<p className='mt-10 sm:max-w-[48rem] text-center text-pink-500 text-xl px-2 sm:text-2xl font-medium'>
					Word a Day is a social platform where you share your thoughts and ideas based on the daily word.
					Join us and share your thoughts about today’s word {' '}
					<span className='ext-pink-500 text-[1.5rem] font-bold'>#{word}</span>
				</p>
				{session &&
					<Link href="/create-post"
						className='flex gap-2 place-items-center mt-10 bg-pink-600 text-white rounded-full p-4 text-lg sm:hidden hover:text-pink-600 hover:bg-white transition-all'>
						Create a Post
						<FontAwesomeIcon icon={faPlus} />
					</Link>
				}
			</div>
			<Feed />
		</>
	)
}
