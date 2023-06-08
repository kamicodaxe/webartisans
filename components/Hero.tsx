import { useRouter } from "next/router"


interface Props { }
export default function Hero({ }: Props) {
    const router = useRouter()
    function push(href: string) {
        router.push(href)
    }
    return (
        <section className="bg-white text-gray-900 bg-[url('/images/hero-bg.png')]">
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:pb-8 lg:flex-row lg:justify-evenly">
                <div className="flex flex-1 flex-col justify-center  md:p-6 md:pt-0 md:pb-0 text-center rounded-sm lg:text-left">
                    <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold leading-none ">
                        Artisans web
                    </h1>
                    <p className="mt-4 text-lg text-gray-700 sm:mb-8">
                        Artisans web.
                    </p>

                </div>
                <div className="flex flex-1 items-center justify-center md:p-6 md:mt-8 lg:mt-0 sm:h-64 lg:h-96 xl:h-64 2xl:h-80">
                    <img src="/images/video.png" alt="" className="object-contain sm:h-64 lg:h-96 xl:h-64 2xl:h-80" />
                </div>
            </div>
            <div
                className='w-full flex flex-col md:flex-row justify-around items-center mt-8 pb-8 space-y-4'>
                <button onClick={() => push('/artisans')} className='px-8 py-4 text-xl rounded text-white bg-[#996600] hover:bg-[#663300]'>Je recherche un artisan</button>
                <button onClick={() => push('/login')} className='px-8 py-4 text-xl rounded text-[#996600] bg-white border border-[#996600] hover:bg-[#663300] hover:text-white'>Je suis un artisan</button>
            </div>
        </section>
    )
}