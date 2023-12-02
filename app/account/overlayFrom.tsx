"use client"
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { cookies, headers } from "next/headers";
import { Session } from "@supabase/supabase-js";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from 'next/navigation';
type Props = {
  handleSub: any
}

const OverlayForm = ({handleSub}:Props) => {
  const router = useRouter();
   async function hand(formData:FormData)
   {
       alert("Information submitted")
       
       const wait = await handleSub(formData)
       router.refresh()
       
   }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 shadow-md z-50">
        <h2 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0"> Enter your full name and username: </h2>
      <form action={hand}>
        <label className="block mb-4">
          <span className="text-gray-300">Name:</span>
          <input
            type="text"
            name="name"
            className="block w-full mt-1 p-2 border rounded-md"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-300">Username:</span>
          <input
            type="text"
            name="username"
            className="block w-full mt-1 p-2 border rounded-md"
            required
          />
        </label>
        <div className="flex items-center justify-between">
        <button type = "submit"  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit and go to Blogs Site</button>
        </div>
      </form>
    
    </div>
  );
};

export default OverlayForm;
