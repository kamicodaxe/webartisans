import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

export default function DropDown({ title, items }: { title: string, items: { title: string, path?: string, action?: () => void }[] }) {
    const router = useRouter()
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md pr-4 lg:px-4 py-2 text-sm font-medium text-gray-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <span className='hidden lg:block' >{title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                    {
                        items.map(item => (
                            <div className="px-1 py-1" key={item.title}>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => {
                                                if (item.action) item.action()
                                                if (item.path) router.push(item.path)
                                            }}
                                            className={`${active ? 'bg-[#996600] text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            {/* {active ? (
                                                <EditActiveIcon
                                                    className="mr-2 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <EditInactiveIcon
                                                    className="mr-2 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            )} */}
                                            {item.title}
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        ))
                    }
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

// function EditInactiveIcon(props) {
//     return (
//         <svg
//             {...props}
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <path
//                 d="M4 13V16H7L16 7L13 4L4 13Z"
//                 fill="#EDE9FE"
//                 stroke="#A78BFA"
//                 strokeWidth="2"
//             />
//         </svg>
//     )
// }

// function EditActiveIcon(props) {
//     return (
//         <svg
//             {...props}
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <path
//                 d="M4 13V16H7L16 7L13 4L4 13Z"
//                 fill="#8B5CF6"
//                 stroke="#C4B5FD"
//                 strokeWidth="2"
//             />
//         </svg>
//     )
// }