import './globals.css'
import AuthForm from './auth-form'


export default function Home() {
  return (
    <div className="row">
      <div className="col-6">
        <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">Blogs website</h1>
        <p className="text-xl font-bold text-white grid place-content-center mb-2 md:mb-0">
           Create and view others&apos; blogs easily!
        </p>
        < br /> <br />
        <h3 className="text-xl font-bold text-white grid place-content-center mb-2 md:mb-0">
            Register or Log in: 
        </h3>
      </div>
      < br /> <br />
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  )
}