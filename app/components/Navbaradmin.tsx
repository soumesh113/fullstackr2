import Link from "next/link"
import { Session } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default async function Navbaradmin({ session }: { session: Session | null })
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
    const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // Close the mobile menu when a new route is navigated to
      closeMobileMenu();
    };

    // Attach the event listener for route changes
    router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenu)
    mobileMenu.classList.toggle('hidden');
  };

  const closeMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenu)
    mobileMenu.classList.add('hidden');
  };

  return (
    <nav className="w-full bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">Blogs Website</Link>

        <div className="lg:hidden">
          {/* Mobile menu button */}
          <button
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        <div id="mobile-menu" className="lg:flex hidden space-x-4">
          <Link href="#compose" className="text-white">Create Blog</Link>
          <Link href="#posts" className="text-white">View Blogs</Link>
          <Link href="#acc" className="text-white">{full_name}</Link>
          <Link href='/admin/' className="text-white">Admin Panel</Link>
        </div>
      </div>
    </nav>
  );
//     return(
//         <nav className="w-full bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
//     <div className="container mx-auto flex justify-between items-center">
//         <Link href="/" className="text-white text-2xl font-bold">Blogs Website</Link>
        
//         <div className="lg:hidden">

//             <button className="text-white focus:outline-none">
//                 <svg
//                     className="h-6 w-6"
//                     fill="none"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                 >
//                     <path d="M4 6h16M4 12h16m-7 6h7"></path>
//                 </svg>
//             </button>
//         </div>

//         <div className="hidden lg:flex space-x-4">
//             <Link href="#compose" className="text-white">Create Blog</Link>
//             <Link href="#posts" className="text-white">View Blogs</Link>
//             <Link href="#acc" className="text-white">{full_name}</Link>
//             <Link href='/admin/' className="text-white">Admin Panel</Link>
//         </div>
//     </div>
// </nav>

//     )
    }
}