import "../globals.css"
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { cookies, headers } from "next/headers";
import { Session } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
const { v4: uuidv4 } = require('uuid');
import Composeblogadmin from "./compose-blog-admin";
export default function Displayadmin({ session }: { session: Session | null }){
    async function addblog(formData: FormData)
    {
        'use server';
         const user = session?.user
         const i = user?.id
         const blog_text = formData.get("blog")
         if(!blog_text) return;
         const supabase = createServerComponentClient({ cookies })
         const full_name = formData.get("author")
         const cont = formData.get("blog")
         const title = formData.get("title")
         let currentDate = new Date().toJSON().slice(0, 10);
        //  console.log(title)
        //  console.log(full_name)
        //  console.log(currentDate)
        //  console.log(cont)
         const id = uuidv4()
        //  console.log(id)
    
         const { error } = await supabase.from('blogs').insert({blog_id: id, title: title, author_name: full_name, publication_date: currentDate, blog_text: cont})
         if(error)
         {
            console.log(error)
         }
         const f = formData.get("file")
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
    return(
        <Composeblogadmin addblog={addblog}/>
    )

}