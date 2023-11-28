import Image from "next/image";
import Link from "next/link";
import FilledButton from "./FilledButton";
import UnfilledButton from "./UnfilledButton";

export default function Nav() {
	const isLoggedIn = true;
	return (
		<nav className="flex justify-between px-4 pt-2">
			<Link href="/"> <Image alt="Logo" src="/logo.svg" width={40} height={40} /> </Link>
			<div className="flex gap-2">
				{!isLoggedIn ? (
					<FilledButton>Sign In</FilledButton>
				) : (
					<>
						{/* Desktop Nav */}
						<FilledButton>Post</FilledButton>
						<UnfilledButton>Sign Out</UnfilledButton>
						<Link href="/profile" className="flex">
							<Image alt="profile" src="/testpp.jpg" width={56} height={56} className="rounded-full object-cover" />
						</Link>
					</>
				)}
			</div>
		</nav>
	)
}
