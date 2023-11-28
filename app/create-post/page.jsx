import Link from "next/link";

export default function CreatePost() {
	return (
		<div className="mt-20 px-6 grid grid-cols-1 sm:grid-cols-2">
			<div className="flex flex-col">
				<h2 className="text-pink-600 text-4xl sm:text-[64px] font-bold">
					Create a Post
				</h2>
				<form className="mt-14 flex flex-col gap-2">
					<label className="text-pink-500 text-lg sm:text-xl font-normal">
						Today's Word:{' '}
						<span className="text-pink-500 sm:text-2xl text-xl font-bold">
							#courage
						</span>
					</label>

					<textarea className="text-shadow rounded-lg p-4 resize-none placeholder:text-neutral-400 placeholder:font-bold"
						placeholder="What do you think about?"
						rows={7} maxLength={250} />

					<div className="flex gap-6 justify-end mt-4">
						<Link href='/' className="text-neutral-500 text-lg sm:text-2xl font-normal">Cancel</Link>
						<button type="submit" className="text-pink-500 text-lg sm:text-2xl font-bold ">Post</button>

					</div>
				</form>
			</div>

			<div className="sm:block hidden" />
		</div>
	);
}
