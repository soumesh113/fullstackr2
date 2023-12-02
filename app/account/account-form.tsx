'use client'
import { useCallback, useEffect, useState } from 'react'

import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';
export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    fullname,
  }: {
    username: string | null
    fullname: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
    router.refresh()
  }

  return (
    <div className="mt-6 mx-auto max-w-2xl">
    <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 border-black-500">
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email</label>
        <input className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div className='mb-4'>
        <label className="block text-white text-sm font-bold mb-2" htmlFor="fullName">Full Name</label>
        <input
         className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-white text-sm font-bold mb-2" htmlFor="username">Username</label>
        <input
          className="shadow appearance-none border border-black-500rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div className="flex items-center justify-between">
        <button
          className= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          onClick={() => updateProfile({ fullname, username })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
        <form action="/auth/signout" method="post">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}