import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { cookies, headers } from "next/headers";
import { Session } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
const { v4: uuidv4 } = require('uuid');
import Composeblog from "./compose-blog";

export default function Display(){
    async function addblog(formData:FormData)
    {
        "use server"
        const supabase = createServerComponentClient({ cookies })
        const {
            data: { session },
          } = await supabase.auth.getSession()
        console.log(formData)
         const user = session?.user
         const i = user?.id
         const blog_text = formData.get("blog")
         if(!blog_text) return;
       
         if(i)
         {
         const { data, status } = await supabase
         .from('profiles')
         .select(`full_name, username`)
         .eq('id', i)
         .single()
         const full_name = data?.full_name
         const cont = formData.get("blog")
         const title = formData.get("title")
         let currentDate = new Date().toJSON().slice(0, 10);
         const id = uuidv4()
         const f = formData.get("file")
         const { error } = await supabase.from('blogs').insert({blog_id: id, title: title, author_name: full_name, publication_date: currentDate, blog_text: cont})
         if(error)
         {
            console.log(error)
         }
         if(f){
         const { data:dat, error:err } = await supabase
  .storage
  .from('icons')
  .upload('public/icon' + id + '.png', f, {
    cacheControl: '3600',
    upsert: false
  })
  if(err)
 {
    console.log(err)
 }
}
 
         
         } 
    }
    return (
        <Composeblog addblog={addblog}/>
    )
}