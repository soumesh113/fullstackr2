
import Navbar from "../components/Navbar"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Posts from '../components/Posts'
import Composeblog from '../components/server/compose-blog'
import Link from 'next/link'
import ListItemAdmin from "./ListItemAdmin"
import Navbaradminpanel from "../components/Navbaradminpanel"
import Composeblogadmin from "./compose-blog-admin"
import Displayadmin from "./display-admin"

export default async function Admin()
{
    "use server";
    const supabase = createServerComponentClient({ cookies })
  async function edit(blog_id:string, title:string, author:string, text:string){
     "use server";
     const supabase = createServerComponentClient({ cookies })
     const { error } = await supabase
  .from('blogs')
  .update({ title: title, author_name: author, blog_text:text })
  .eq('blog_id', blog_id)
    if(error)
    {
        console.log(error)
    }
  }
  async function delet(blog_id:string){
       "use server";
       const supabase = createServerComponentClient({ cookies })
       console.log(blog_id)
       const { error } = await supabase
  .from('blogs')
  .delete()
  .eq('blog_id', blog_id)
   if(error){
    console.log(error)
   }

  }
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user
  const i = user?.id
  const { data, status } = await supabase
  .from('profiles')
  .select(`full_name, admin`)
  .eq('id', i)
  .single()
  const full_name = data?.full_name
  const admin = data?.admin
  if(admin==null)
  {
    return{
       redirect: {
          destination: '/account',
          permanent: false,
       }
    }
  }
  const { data : dat, error: err } = await supabase.from('blogs').select()
    const posts = dat
    if(posts)
    {
    return(
        <div>
            <Navbaradminpanel session={session} />
            < br /> <br />
            <div id = "compose">
            <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">Create Blog:</h1>
            <Displayadmin session={session} />
            </div>
            <div id = "posts">
            <section className="mt-6 mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">Blogs:</h1>
            < br />
            <ul className="w-full ">
                {posts.map(post=>(
                    <ListItemAdmin key = {post.blog_id} post = {post} edit = {edit} delet = {delet}/>
                ))}
            </ul>
        </section>
        </div>
        </div>
    )
                }
}