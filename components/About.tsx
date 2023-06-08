import IArtisan from "../models/IArtisan";


interface Props { user: IArtisan }
export default function About({ user }: Props) {

    return (
        <section className="bg-white text-gray-900">
            <h4>Job: {user.job}</h4>
        </section>
    )
}