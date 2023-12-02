
import getFormattedDate from "@/lib/getFormattedDate"
import { createClient } from "@supabase/supabase-js"
import { Database } from "@/types/supabase"
import { notFound } from "next/navigation"
import Link from "next/link"
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export async function generateMetadata({params}: {params: {postId:
    string }}) {
        const supabase = createServerComponentClient({ cookies })
        const { data : dat, error: err } = await supabase.from('blogs').select()
        const posts = dat
       const {postId} = params
       if(posts)
       {
       const post = posts.find(post => post.blog_id === postId)
       if(!post)
       {
           return {
            title: 'Post Not Found'
           }
       }
       return {
        title: post.title,
       }
    }
    }

export default async function Post({params}: {params: {postId:
   string }}) {
    const supabase = createServerComponentClient({ cookies })
    const { data : dat, error: err } = await supabase.from('blogs').select()
    const posts = dat
      const {postId} = params
      if(posts)
      {
      if(!posts.find(post=> post.blog_id ===postId))
      {
        return notFound()
      }
      const post = posts.find(post => post.blog_id === postId)
      const { title, author_name, publication_date, blog_text} = post
      const CDN = "https://cswwcnqbthtmsfmrcmke.supabase.co/storage/v1/object/public/icons/public/"
      const id = postId
      const url = CDN + 'icon' + id + '.png'
      const pubDate = getFormattedDate(publication_date)
      const h = 200
      const w = 600
      const text = blog_text;
      const newText = text.split('\n').map((str:string, i:string) => <p key = {i}> {str} </p>);
       return(
          <main className="container mx-auto mt-8">
             
            <div className="max-w-2xl p-8 rounded-md shadow-md mx-auto">
            <img
            src={url}
            alt={title}
            width={w}
            height={h}
            className="object-cover mb-4 rounded-md"
          />
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <div className="flex items-center text-gray-300 text-sm mb-4">
        <p className="mr-2">By {author_name}, </p>
        <p className="mr-2">Published on {pubDate}</p>
      </div>

      <div className="prose">
        {newText}
      </div>
            </div>
          </main>
       )
      }
   }