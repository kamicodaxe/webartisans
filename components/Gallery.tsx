import { useEffect, useState } from 'react';
import { getGallery } from "../api/firebase";


interface Props { userId: string }
export default function Gallery({ userId }: Props) {
    const [gallery, setGallery] = useState<string[]>([]);

    useEffect(() => {
        getGallery(userId).then((data) => {
            let images: string[] = [];
            data.forEach((item, i) => {
                images.push(item)
            })
            setGallery(images)
        });
    }, [userId])

    return (
        <section className="py-6 dark:bg-gray-800">
            <div className="container flex flex-col justify-center p-4 mx-auto">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
                    {
                        gallery.map(image => (
                            <div key={image} className='w-full aspect-w-2 aspect-h-2'>
                                <img className="object-cover dark:bg-gray-500" src={image} alt='' />
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}