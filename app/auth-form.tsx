'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthForm() {
  const supabase = createClientComponentClient()

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ extend: false,
        className: {
          label: "block text-sm font-medium text-gray-300",
          input: "mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500",
          button: "mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300",
          container: "max-w-md mx-auto bg-black p-6 rounded-md shadow-md",
          message: "block mt-4 text-base font-medium text-gray-200"
        },}}
      theme="default"
      showLinks={false}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"
      // "https://fullstackr-six.vercel.app/auth/callback"
    />
  )
}