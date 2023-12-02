import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { cookies, headers } from "next/headers";
import { Session } from "@supabase/supabase-js";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import OverlayForm from "./overlayFrom";

export default function Disp({ session }: { session: Session | null }){
    async function handleSub(formData:FormData) {
        "use server"
        try {
          const supabase = createServerComponentClient({ cookies })
            const user = session?.user
            const full_name = formData.get("name")
            const username = formData.get("username")
            const { error } = await supabase.from('profiles').upsert({
              id: user?.id as string,
              full_name: full_name as string,
              username: username as string,
              updated_at: new Date().toISOString(),
            })
            if (error) throw error
            
          } catch (error) {
            console.log(error)
          } 
      }
      return(
          <OverlayForm handleSub = {handleSub} />
      )
}