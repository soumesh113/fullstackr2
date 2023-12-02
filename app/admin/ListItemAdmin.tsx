"use client";
import Link from "next/link"
import getFormattedDate from "@/lib/getFormattedDate"
import { useState } from 'react'
import Overlay from "./Overlay";
import { useRouter } from 'next/navigation';
type Props = {
    post: Blog,
    edit: any,
    delet: any
}

export default function ListItemAdmin({post, edit, delet}: Props){
  const router = useRouter()
    const [isFormOpen, setIsFormOpen] = useState(false);
    const openForm = () => {
        setIsFormOpen(true);
      };
    
      function closeForm(){
        setIsFormOpen(false);
         router.refresh()
      };
      function editt(blog_id:string, title:string, author:string, text:string){
          edit(blog_id, title, author, text)
      }
      async function delett()
      {
          alert("Blog deleted")
          const {blog_id} = post
          const wait = await delet(blog_id)
          router.refresh()
      }
    const {blog_id, title, author_name, publication_date, blog_text} = post
    const formattedDate = getFormattedDate(publication_date)
    return (
        <div>
        {isFormOpen && <Overlay onClose={closeForm} editt = {editt} post = {post} />}
        <li className="p-6 rounded-md shadow-md border border-black-500" key = {blog_id}>
            <h2 className="text-xl font-bold mb-2">
            <Link  href={`/posts/${blog_id}`}>{title}</Link>
            </h2>
            <p className="text-sm text-gray-500">By {author_name} </p>
            <p className="text-sm text-blue-500">{formattedDate}</p>
            <h2> Content: </h2>
            <p className="text-xs">
               {blog_text}
            </p>
            <br />
            <div className="flex items-center justify-between">
            <button onClick={openForm} className= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
  Edit
</button>
<button onClick={delett} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
  Delete
</button>
            </div>
        </li>
        <br />
        </div>
    )
}