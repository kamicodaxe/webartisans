/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import currency from 'currency.js'
import { Fragment, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import formatPrice from '../../lib/formatPrice'
import ICartItem from '../../models/ICartItem'
import { cartActions, selectCart } from './cartSlice'
interface Props {
  open: boolean
  setOpen: (v: boolean) => void
}

export default function CartComponnt({ open, setOpen }: Props) {
  const cart = useSelector(selectCart)
  const dispatch = useDispatch()

  const total = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0)
  }, [cart])

  function increment(item: ICartItem) {
    return () => dispatch(cartActions.increment(item))
  }

  function decrement(item: ICartItem) {
    return () => dispatch(cartActions.decrement(item))
  }

  function remove(item: ICartItem) {
    return () => dispatch(cartActions.remove(item))
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900"> Shopping cart </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {
                              cart.map(cartItem => (
                                <li key={cartItem.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    {
                                      cartItem?.imageSrc &&
                                      (
                                        <img
                                          src={cartItem.imageSrc}
                                          alt={cartItem.name}
                                          className="h-full w-full object-cover object-center"
                                        />
                                      )
                                    }
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={cartItem?.href || ''}> {cartItem.name} </a>
                                          <p className="text-gray-500 text-sm">{formatPrice(cartItem.price)}</p>
                                        </h3>
                                        <p className="ml-4">{formatPrice(currency(cartItem.price).multiply(cartItem.quantity).value)}</p>
                                      </div>
                                      {/* <p className="mt-1 text-sm text-gray-500">{cartItem.color}</p> */}
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      {/* <p className="text-gray-500">Qty {cartItem.quantity}</p> */}
                                      <div className="flex flex-row">
                                        <button
                                          type="button"
                                          onClick={decrement(cartItem)}
                                          className="font-medium text-[#996600] hover:text-[#663300] px-4 pl-0"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                          </svg>
                                        </button>
                                        <p className="text-gray-500">{cartItem.quantity}</p>
                                        <button
                                          type="button"
                                          onClick={increment(cartItem)}
                                          className="font-medium text-[#996600] hover:text-[#663300] px-4"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                          </svg>
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={remove(cartItem)}
                                          className="font-medium text-[#996600] hover:text-[#663300]"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{formatPrice(total)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-[#996600] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#663300]"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-[#996600] hover:text-[#663300]"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
