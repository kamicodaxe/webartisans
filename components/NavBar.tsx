import Link from "next/link"
import { Fragment, useMemo, useState } from 'react'
import { useSelector } from "react-redux"
import { logout } from "../api/firebase"
import { selectCart } from "../features/cart/cartSlice"
import { selectUser } from "../features/user/userSlice"
import Drawer from "./Drawer"
import DropDown from "./DropDown"

interface Props {
  toggleCart: () => void
}

export default function NavBar({ toggleCart }: Props) {
  const cartItems = useSelector(selectCart)
  const count = useMemo(() => cartItems.length, [cartItems])
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const toggleMenu = () => setIsMenuVisible(v => !v)
  const user = useSelector(selectUser)

  return (
    <Fragment>
      <nav className='flex flex-row pl-4 pr-4 bg-gray-900 w-full p-4 items-center'>
        <h1 className="text-2xl font-bold text-white flex flex-1 lg:flex-0 flex-row space-x-4">
          <svg onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 block lg:hidden">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>

          <img className='h-8 hidden lg:block' src="/images/logo.png" alt='Artisans web' />

          {/* Le logo unpeu plus grand */}
          <Link href='/'>Artisans web</Link>
        </h1>

        <ul className={`hidden lg:flex lg:flex-row pl-4 pr-4 space-x-16 justify-end flex-1 items-center`}>
          <li className='flex flex-col justify-center text-white text-base'>
            <Link
              href={`/artisans`}
              className=''
            >
              Nos Artisans
            </Link>
          </li>
          <li className='flex flex-col justify-center text-white text-base'>
            <Link
              href={`/boutique_atelier`}
              className='block'
            >Boutique atelier</Link>
          </li>
          <li className='flex flex-col justify-center text-white text-base'>
            <Link
              href={`/blog`}
              className=''
            >Atualités/Blog #</Link>
          </li>
          {/* <li className='flex flex-col justify-center text-white text-base'>
            <Link
              href={`/contact`}
              className=''
            >Contact #</Link>
          </li> */}


          {
            !user?.uid && (
              <li className='flex flex-col justify-center text-white text-base'>
                <Link
                  href='/login'
                >Connexion</Link>
              </li>
            )
          }


          {/* <li
            onClick={openCategories}
            className='flex flex-row items-center text-white text-base hover:cursor-pointer'>
            <p
              className='p-0 m-0'
            >All Categories</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </li> */}

        </ul>

        {
          !user?.uid && (
            <Link href='/signup'>
              <span className='hidden lg:inline-block px-8 py-2 text-xl rounded text-white bg-[#996600] hover:bg-[#663300] cursor-pointer'>
                Inscription
              </span>
            </Link>
          )
        }

        <button className="lg:ml-4" onClick={toggleCart}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="bg-white w-4 h-4 rounded-md absolute top-4">
            <p className="leading-3">{count}</p>
          </span>
        </button>

        {
          user?.uid && (
            <span className='flex items-center p-1 pl-2  ml-4 text-md rounded-full text-gray-800 bg-gray-100 hover:bg-white cursor-pointer'>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <DropDown
                // titleStyles=[]
                title={user.displayName as string}
                items={[
                  { title: 'Profile', path: '/profile' },
                  { title: 'Mes avis #', path: '/avis' },
                  { title: 'logout', action: () => { logout() } },
                ]}
              />
            </span>
          )
        }

      </nav>
      <Drawer open={isMenuVisible} setOpen={setIsMenuVisible} />
    </Fragment>
  )
}