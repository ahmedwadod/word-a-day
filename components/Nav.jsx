'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FilledButton from "./FilledButton";
import UnfilledButton from "./UnfilledButton";

import { signIn, signOut, getProviders, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faArrowRightFromBracket, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
	const [dropDown, setDropDown] = useState(false);
	const [providers, setProviders] = useState(null);
	const { data: session } = useSession();
	const isLoggedIn = session?.user;
	const router = useRouter()

	useEffect(() => {
		(async () => {
			const res = await getProviders();
			setProviders(res);
		})();
	}, []);

	return (
		<nav className="flex justify-between px-4 pt-2">
			<Link href="/"> <Image alt="Logo" src="/logo.svg" width={40} height={40} /> </Link>
			<div className="flex gap-2">
				{session === undefined ? <div /> : !isLoggedIn ?
					providers && Object.values(providers).map((provider) => (
						<FilledButton key={provider.id} onClick={() => signIn(provider.id)}>
							Sign in with
							<FontAwesomeIcon icon={faGoogle} />
						</FilledButton>
					))
					: (
						<>
							{/* Desktop Nav */}
							<div className="sm:flex sm:gap-2 hidden">
								<FilledButton onClick={() => router.push('/create-post')}>
									Post
									<FontAwesomeIcon icon={faPlus} />
								</FilledButton>
								<UnfilledButton onClick={() => signOut()}>
									Sign Out
									<FontAwesomeIcon icon={faArrowRightFromBracket} />
								</UnfilledButton>
								<Link href="/profile" className="flex">
									<Image alt="profile" src={session.user.image} width={56} height={56} className="rounded-full object-cover" />
								</Link>
							</div>

							{/* Mobile Nav */}
							<div className="sm:hidden flex">
								<Image alt="profile" src={session.user.image} width={56} height={56}
									className="rounded-full object-cover"
									onClick={() => setDropDown((prev) => !prev)}
								/>
								{dropDown &&
									(
										<div className="absolute top-20 right-2 bg-white rounded-lg min-w-[20rem] flex flex-col py-2">
											<Link className="py-2 px-4 hover:bg-neutral-300 hover:text-pink-600 font-normal text-lg flex place-items-center gap-2" href="/profile" onClick={() => setDropDown(false)}>
												<FontAwesomeIcon icon={faUser} />
												My Profile
											</Link>
											<Link className="py-2 px-4 hover:bg-neutral-300 text-pink-600 font-normal text-lg flex place-items-center gap-2" href="/create-post" onClick={() => setDropDown(false)}>
												<FontAwesomeIcon icon={faPlus} />
												Create a Post
											</Link>

											<hr className="mx-4" />

											<button onClick={() => {
												signOut();
												setDropDown(false);
											}} className="py-2 px-4 text-start focus:bg-neutral-300 focus:text-pink-600 font-normal text-lg flex place-items-center gap-2" href="/create-post">
												<FontAwesomeIcon icon={faArrowRightFromBracket} />
												Sign Out
											</button>
										</div>
									)
								}
							</div>
						</>
					)}
			</div>
		</nav >
	)
}
