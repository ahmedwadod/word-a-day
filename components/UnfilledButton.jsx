
export default function UnfilledButton({ children, onClick }) {
	return <button className="hover:bg-pink-600 rounded-full  flex gap-2 place-items-center justify-center min-w-[100px] px-4 py-1 font-normal text-lg hover:border-none hover:text-white bg-white text-pink-600 border-pink-600 transition-all"
		onClick={onClick}
	>
		{children}
	</button>
}
