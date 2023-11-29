'use client';
import { useSession } from "next-auth/react";

function NeedToSignIn() {
	return <>
		<div className="flex h-[90vh] screen min-w-screen justify-center place-items-center text-pink-600 text-lg sm:text-xl font-semibold px-4 text-center">
			You need to sign in to view this page
		</div>
	</>
}

export default function AuthGuard({ children }) {
	const { data: session } = useSession();

	return (
		<>
			{session?.user ? children : <NeedToSignIn />}
		</>
	);
}
