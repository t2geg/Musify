"use client";

import { signIn, signOut, useSession } from "next-auth/react"
import { Music, Users, Radio } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"


export function Appbar() {

    const session = useSession(); // session must be wrapped inside SessionProvider

    return <div>
        <div className="">
            <div>
                <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800 bg-gray-900">
                    <Link className="flex items-center justify-center" href="#">
                        <Music className="h-6 w-6 text-purple-500" />
                        <span className="ml-2 text-2xl font-bold text-purple-500">Musify</span>
                    </Link>
                    <nav className="ml-auto flex gap-4 sm:gap-6">
                        {session.data?.user && <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={() => signOut()}>LogOut</Button>}
                        {!session.data?.user && <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={() => signIn()}>SignIn</Button>}
                    </nav>
                </header>
            </div>
        </div>
    </div>
}