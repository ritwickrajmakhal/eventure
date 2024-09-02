import Gallery from "@/components/Gallery"
export default function Page({ params }) {
    const images = [{"url" : "https://example.com"}];
    return <div className="text-white">

        My post: {params.slug}
        <Gallery img={images}/>

    </div>
}