/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

interface Props {
  open: boolean
  setOpen: (v: boolean) => void
}

const MENU = [
  { id: '0', title: 'Acceuil', link: '/' },
  { id: '1', title: 'Nos Artisans', link: '/artisans' },
  { id: '2', title: 'Boutique atelier', link: '/boutique_atelier' },
  { id: '3', title: 'Atualités/Blog', link: '/blog' },
  // { id: '4', title: 'Contact', link: '/contact' },
]

export default function Drawer({ open, setOpen }: Props) {
  const router = useRouter()

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
            <div className="pointer-events-none fixed inset-y-0 right-full flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-0"
                enterTo="translate-x-full"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-full"
                leaveTo="translate-x-0"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900"> Menu </Dialog.Title>
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
                              MENU.map(item => (
                                <li onClick={() => router.push(item.link)} key={item.id} className="flex py-6">
                                  <span>{item.title}</span>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">

                      <button
                        onClick={() => {
                          router.push('/signup')
                        }}
                        className="mt-0.5 w-full text-base font-medium text-center text-[#996600]">
                        Inscription <span aria-hidden="true"> &rarr;</span>
                      </button>
                      <div className="mt-6">
                        <button
                          onClick={() => {
                            router.push('login')
                          }}
                          className="w-full rounded-md border border-transparent bg-[#996600] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#663300]"
                        >
                          Connexion
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          <button
                            type="button"
                            className="font-medium text-[#996600] hover:text-[#663300]"
                            onClick={() => alert('Terms')}
                          >
                            Terms and conditions<span aria-hidden="true"> &rarr;</span>
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
