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
        <section className="mt-6 mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">Blogs:</h1>
            <br />
            <ul className="w-full grid">
                {posts.map(post=>(
                    <ListItem key = {post.blog_id} post = {post} />
                ))}
            </ul>
        </section>
    )
                }
}