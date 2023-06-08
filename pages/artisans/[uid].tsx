import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

import { Tab } from '@headlessui/react'
import api from '../../api'
import { updateData } from '../../api/firebase'
import { getAvatar } from '../../api/users'
import About from '../../components/About'
import Gallery from '../../components/Gallery'
import Reviews from '../../components/Reviews'
import IArtisan from '../../models/IArtisan'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  item: IArtisan
}


const Artisan = ({ item }: Props) => {
  const [profileUri, setProfileUri] = useState('')
  useEffect(() => {
    if (!item.avatarUri) {
      getAvatar(item.id).then(uri => {
        if (!item.avatarUri && uri) {
          updateData('users', item.id, {
            avatarUri: uri
          })
        }
        if (uri) setProfileUri(uri)
      })
        .catch(() => { })
    } else {
      setProfileUri(item.avatarUri)
    }

  }, [item])

  const [tabs] = useState([
    { id: 0, title: 'A propos' },
    { id: 1, title: 'Photos' },
    { id: 2, title: 'Avis' },
  ])

  return (
    <Layout>
      <main className="profile-page">
        <section className="block h-[500px]">
          <div className="top-0 w-full h-full bg-center bg-cover" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')"
          }}>
            <span id="blackOverlay" className="w-full h-full opacity-50 bg-black"></span>
          </div>
          <div className="top-auto bottom-0 left-0 right-0 w-full pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
            <svg className="bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
              <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </section>

        <section className="relative py-16 bg-blueGray-200 mx-auto ">
          <div className="container px-4 mx-auto">
            <div className="relative flex flex-col min-w-9/12 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6 lg:w-9/12 mx-auto">
                <div className="flex flex-wrap justify-between">
                  <div className="w-full lg:w-8/12 px-4 lg:order-1 flex flex-col items-center text-center lg:text-left lg:flex-row">
                    <div className="w-48 h-48 -mt-24">
                      {
                        profileUri ?
                          <img alt="..." src={profileUri} className="shadow-xl rounded-full object-cover h-full w-full align-middle border-none" />
                          :
                          <div className="w-48 h-48 flex justify-center items-center rounded-full bg-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-gray-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                      }
                    </div>
                    <div className="ml-4 mb-2">
                      <h3 className="text-4xl font-semibold leading-normal text-blueGray-700">
                        {item.commercial_name}
                      </h3>
                      <div className="mb-2 text-blueGray-600 mt-2">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 w-full">
                      <button className="bg-[#996600] w-full active:bg-[#663300] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                        Contacter
                      </button>
                    </div>
                  </div>
                  {/* <div className="w-full lg:w-4/12 px-4 lg:order-2">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="mt-8">
                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl  p-1">
                      {
                        tabs.map(tab => (
                          <Tab
                            key={tab.id}
                            className={({ selected }) =>
                              classNames(
                                'w-full py-2.5 text-sm font-medium leading-5',
                                '',
                                selected
                                  ? 'text-[#996600] bg-white border-b-4 border-[#996600]'
                                  : 'text-gray-800 hover:bg-white/[0.12] border-b-2 border-gray-400'
                              )
                            }
                          >
                            {tab.title} {tab.id == 2 && `(${item?.reviews.length})`}
                          </Tab>
                        ))
                      }
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                      {
                        tabs.map(tab => (
                          <Tab.Panel
                            key={tab.id}
                            className={({ selected }) =>
                              classNames(
                                'w-full py-2.5 text-sm font-medium leading-5',
                                'pb-32',
                                selected
                                  ? 'text-gray-800 hover:bg-white/[0.12]'
                                  : 'text-gray-800 hover:bg-white/[0.12]'
                              )
                            }
                          >
                            {tab.id == 0 && <About user={item} />}
                            {tab.id == 1 && <Gallery userId={item.id} />}
                            {tab.id == 2 && <Reviews reviews={item.reviews} />}
                            <div className="pb-32" />
                          </Tab.Panel>
                        ))
                      }
                    </Tab.Panels>
                  </Tab.Group>

                </div>

              </div>

            </div>


          </div>

        </section>
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  let item: IArtisan;
  try {
    const docSnapshot = await api.artisans.getArtisan(context.params?.uid as string)
    console.log('Artisan id is: ' + docSnapshot.id)
    if (!docSnapshot.exists()) {
      console.log('404: NOT FOUND')
      return {
        props: {
          item: {},
          revalidate: 0
        }
      }
    }

    const data = docSnapshot.data() as IArtisan

    item = {
      ...data,
      id: docSnapshot.id,
      // createdAt: data.createdAt.toMillis(),
      // updatedAt: data.updatedAt.toMillis(),
      // @ts-ignore
      reviews: data?.reviews.map(($$: any) => ({ ...$$, date: $$.date.toMillis(), createdAt: $$.date.toMillis() })),
      avatarUri: data?.avatarUri || '',
    } as unknown as IArtisan
  } catch (e) {
    console.log('SERVER ERROR', e)
  }

  return {
    props: {
      // @ts-ignore
      item,
      revalidate: 0
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let artisans: IArtisan[] = []
  const productsSnapshot = await api.artisans.getAll(20)
  artisans = productsSnapshot.docs.map($ => ({
    ...$.data(),
    id: $.id,
    reviews: $.data()?.reviews.map(($$: any) => ({ ...$$.date.toMillis() })),
  } as unknown as IArtisan))

  return {
    paths: artisans.map($ => ({ 'params': { uid: $.id } })), //OK
    fallback: 'blocking'
  }

}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // ...
// }


export default Artisan