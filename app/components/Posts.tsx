import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import ListItem from "./ListItem";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export default async function Posts(){
    const supabase = createServerComponentClient({ cookies })
    const { data : dat, error: err } = await supabase.from('blogs').select()
    const posts = dat
    if(posts)
    {
    return (
        <section className="mt-6 mx-auto max-w-full px-6">
        <h1 className="text-5xl font-bold text-white grid place-content-center pb-8 md:mb-0">Blogs</h1>
        {/* <br /> */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <ListItem key={post.blog_id} post={post} />
          ))}
        </ul>
      </section>
    )
                }
}