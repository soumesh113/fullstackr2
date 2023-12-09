import Link from "next/link"
import { Session } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export default async function Navbar({ session }: { session: Session | null })
{
    'use server';
    const user = session?.user
    const i = user?.id
    const supabase = createServerComponentClient({ cookies })
    if(i)
    {
    const { data, status } = await supabase
    .from('profiles')
    .select(`full_name`)
    .eq('id', i)
    .single()
    const full_name = data?.full_name
    return(
        <nav className="w-full bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10 mr-4">
           <div className="container mx-auto flex md:justify-between md:items-center">
                <Link href="/" className="text-white text-2xl font-bold">Blogs Website</Link>
                <div className="space-x-1 md:space-x-4">
        <Link href="#compose" className="text-white float:right text-xs md:text-base">Create Blog</Link>
        <Link href="#posts" className="text-white float:right text-xs md:text-base">View Blogs</Link>
        <Link href="#acc" className="text-white float:right text-xs md:text-base">{full_name}</Link>
      </div>
            </div>
        </nav>
    )
    }
}