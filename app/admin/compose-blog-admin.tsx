"use client"
import "../globals.css"
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { cookies, headers } from "next/headers";
import { Session } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
const { v4: uuidv4 } = require('uuid');
import { useRouter } from 'next/navigation';
type Props = {
    addblog: any
}

const Composeblogadmin = ({addblog}:Props)=>{
    const router = useRouter()
    const cols = 202
    const rows = 10
    function handle(formData:FormData){
        alert("Blog added")
        const wait = addblog(formData)
        router.refresh()
    }
    return (
        <div className="max-w-md mx-auto p-6 rounded-md shadow-md">
        <form action = {handle} className="w-full h-full">
        <div className="mb-4">
            <input name = "title" type = "text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter blog title here" required/>
            </div>
            <br /> 
            <div className="mb-4">
            <input name = "author" type = "text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter author name here" required/>
            </div>
            <br /> 
            <div className="mb-4">
            <textarea
              name = "blog"
              rows={rows}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
              placeholder="Enter blog content here"
              required/>
              </div>
             <label htmlFor="file" className="block text-lg font-semibold mb-4">Upload an Image</label>
              <input
      type="file"
      id = "file"
      name="file"
      className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      required/>
            <br /> <br />
            <div className="w-full justify-between items-center flex">
                <div className="w-full max-w-[100px]">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
            </div>
        </form>
        </div>
    )
}

export default Composeblogadmin