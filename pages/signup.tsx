import Link from "next/link"
import { useMemo, useState } from "react"
import { signup } from "../api/firebase"
import Layout from "../components/Layout"


export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const disabled = useMemo(() => {
    // TODO: Validate here!
    if (!email || !password) return true
    return false
  }, [email, password])

  function submitForm() {
    signup(email, password)
  }

  return (
    <Layout>
      <div className="flex bg-[url('/images/auth_bg_image.png')] bg-cover p-8 md:p-16">
        <div className="max-w-md p-4 mx-auto my-auto rounded-md bg-white shadow sm:p-8 dark:bg-gray-900 dark:text-gray-100">
          <h2 className="mb-3 text-3xl font-semibold text-center">Remplissez le formulaire pour continuer</h2>
          <p className="text-sm text-center dark:text-gray-400">Vous n&apos;avez pas de compte?
            <Link href="/register">
              <span className="focus:underline hover:underline cursor-pointer"> Inscription</span>
            </Link>
          </p>

          <form action="" className="space-y-8 ng-untouched ng-pristine ng-valid">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm">E-mail</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="leroy@jenkins.com"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm">Mot de passe</label>
                  <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-400">Forgot password?</a>
                </div>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
              </div>
            </div>
            <button
              disabled={disabled}
              onClick={e => {
                e.preventDefault()
                submitForm()
              }}
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md bg-[#996600] text-white"
            >S&apos;inscrire</button>
          </form>

          <div className="flex items-center w-full my-4">
            <hr className="w-full dark:text-gray-400" />
            <p className="px-3 dark:text-gray-400">OR</p>
            <hr className="w-full dark:text-gray-400" />
          </div>

          <div className="my-6 space-y-4">
            <button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p>Login with Google</p>
            </button>
          </div>

        </div>
      </div>
    </Layout>
  )
}