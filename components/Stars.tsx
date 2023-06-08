

interface Props {
    rating: number // 1-5,
    size: number
}

export default function Stars({ rating, size }: Props) {
    return (
        <div className="flex space-x-1">
            {
                new Array(5).fill('0').map((_, i) => (
                    <Star key={i + ''} size={size} color={i + 1 > rating ? 'black' : 'yellow'} />
                ))
            }
        </div>
    )
}


const Star = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-${size} h-${size}`} style={{ color }}>
        <path fill={color == "black" ? "" : color} strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
)