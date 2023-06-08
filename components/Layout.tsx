import { updateProfile, User } from "firebase/auth";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getData } from "../api/firebase";
import CartComponent from "../features/cart/CartComponent";
import { userActions } from "../features/user/userSlice";
import { auth } from "../firebase.app";
import ICategory from "../models/ICategory";
import Footer from "./Footer";
import NavBar from "./NavBar";

interface Props {
  categories?: ICategory[]
  hideFooter?: boolean
}
// Contact, A propos, en anglais en francais

export default function Layout({ children, hideFooter }: React.PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(
      user => {
        if (!user) {
          dispatch(userActions.destroy())
        } else {
          dispatch(userActions.load(user))
          getData('users', user.uid)
            .then(userData => {
              if (!user.displayName) updateProfile(user, {
                displayName: `${userData?.first_name} ${userData?.name}`.trim()
              })
              if (!user.photoURL) {
                // Check photo profile and update!
              }
              dispatch(userActions.update({ ...userData, id: auth.currentUser?.uid } as unknown as User))
            })
        }

      },
      e => {
        dispatch(userActions.destroy())
      }
    )
    return unsub
  }, [])

  function toggleCart() {
    setOpen(v => !v)
  }

  return (
    <Fragment>
      <Head>
        <title>Artisans web</title>
        <meta name="description" content="Artisans web" />
      </Head>
      <NavBar toggleCart={toggleCart} />
      {children}
      {
        !hideFooter && <Footer categories={[]} />
      }
      <CartComponent open={open} setOpen={setOpen} />
    </Fragment>
  )
}