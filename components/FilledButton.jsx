
export default function FilledButton({ children, onClick }) {
	return <button className="bg-pink-600 rounded-full flex gap-2 place-items-center justify-center min-w-[100px] px-4 py-1 font-normal text-lg border-none text-white hover:bg-white hover:text-pink-600 hover:border-pink-600 transition-all"
		onClick={onClick}
	>
		{children}
	</button>
}
