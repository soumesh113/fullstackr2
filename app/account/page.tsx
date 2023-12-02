import Display from '../components/server/display-compse'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AccountForm from './account-form'
import Navbaradmin from '../components/Navbaradmin'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import Composeblog from '../components/server/compose-blog'
import OverlayForm from './overlayFrom'
import Link from 'next/link'
import Disp from './disp'

export default async function Account() {

  const supabase = createServerComponentClient({ cookies })

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
  if(full_name==null)
  {
  return (
    <div>
     <Disp session={session} />
  </div>
  )
  }
  else if(admin==null)
  {
    return(
      <div>
        <Navbar session={session} />
        < br />  < br /> 
        <div id = "compose">
        <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">Create your own Blog:</h1>
   <Display />
   </div>
   <div>
   <div id = "posts">
   <Posts />
   </div>
   <br />
   <div id="acc">
   <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">Account Information:</h1>
   <AccountForm session={session} />
   </div>
   </div>
   </div>
    )
  }
 
  else
  {
    return(
      <div>
        <Navbaradmin session={session} />
 <br /><br />
 <div id = "compose">
 <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">Create your own Blog:</h1>
   <Display />
   </div>
   <div>
    <div id = "posts">
   <Posts />
   </div>
   <br /><br />
   <div id="acc">
   <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">Account Information:</h1>
   <AccountForm session={session} />
   </div>
   </div>
   </div>
    )
  }
}