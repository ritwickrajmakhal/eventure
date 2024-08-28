export default function Page({ params }) {
    return <div className="text-white">

        My post: {params.slug}

    </div>
}