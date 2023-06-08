import Link from "next/link"
import IArtisan from "../models/IArtisan"

export const Artisan = (artisan: IArtisan) => (
    <Link href={'/artisans/' + artisan.id} key={artisan.id}>
        <div className="space-y-4 hover:cursor-pointer text-gray-800 hover:text-[#996600]">
            {
                artisan.avatarUri ?
                    <div className="h-48 w-48 mx-auto mb-4 rounded-full bg-gray-500">
                        <img alt="" className="object-cover w-full h-full rounded-full" src={artisan.avatarUri} />
                    </div>
                    : (
                        <div className=" w-full h-48 flex justify-center items-center rounded-sm dark:bg-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>

                    )
            }
            <div className="flex flex-col items-center text-center">
                <h4 className="text-xl font-semibold">{artisan?.commercial_name}</h4>
                <p className="text-sm dark:text-gray-400">{artisan.job}</p>
                <p className="text-sm dark:text-gray-400 text-center">{artisan.description}</p>
            </div>
        </div>
    </Link>

)

interface Props {
    title?: string
    artisans: IArtisan[]
}
export default function Artisans({ artisans, title }: Props) {
    return (
        <section className="dark:bg-gray-800 dark:text-gray-100">
            <div className="container p-4 pt-0 mx-auto space-y-8 sm:p-8 lg:py-12">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold leading-none sm:text-3xl"> {title || "Nos Artisans"} </h3>
                    {/* <p className="max-w-2xl dark:text-gray-400">At a assumenda quas cum earum ut itaque commodi saepe rem aspernatur quam natus quis nihil quod, hic explicabo doloribus magnam neque, exercitationem eius sunt!</p> */}
                </div>
                <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                    {
                        artisans.map(artisan => <Artisan {...artisan} key={artisan.id} />)
                    }
                </div>
                {/* <h3 className="text-2xl font-bold leading-none sm:text-3xl">Artisans dépanneurs</h3>
                <div className="grid w-full grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    {
                        artisans.map(artisan => <Artisan {...artisan} key={artisan.id} />)
                    }
                </div> */}
            </div>
            {
                !title && (
                    <div className="flex flex-col py-8 lg:py-12 space-y-8 items-center text-center bg-[#663300]">
                        <h3 className="text-2xl font-bold leading-none sm:text-3xl text-white">Vous souhaitez rejoindre notre réseau d&apos;artisans ? Cliquez ci-dessous.</h3>
                        <button className='px-8 py-4 text-[#996600] text-2xl rounded bg-white border border-[#996600] hover:text-white hover:bg-[#996600]'>Devenez un artisan</button>
                    </div>
                )
            }
        </section>
    )
}