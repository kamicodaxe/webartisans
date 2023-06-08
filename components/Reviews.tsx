import Stars from "./Stars"


interface Props {
    reviews: any[]
}
export default function Reviews({ reviews }: Props) {
    return (
        <section className="bg-white text-gray-900">
            {
                reviews.map((_review, i) => (
                    <div key={_review?.reviewer + i}>
                        <div className="flex space-x-2 items-center">
                            <span className="text-xl">{_review?.firstName}</span> <Stars rating={_review?.rating} size={4} />
                        </div>
                        <span className="text-xs">{new Date(_review?.date).toLocaleDateString()}</span>
                        <p className="text-blueGray-600">{_review?.review}</p>
                    </div>
                ))
            }
        </section>
    )
}