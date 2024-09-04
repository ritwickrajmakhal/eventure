import CustomerReview from "@/components/CustomerReview";
import Gallery from "@/components/Gallery"
import Help from "@/components/Help";
import Plan from "@/components/Plan";
export default function Page({ params }) {
    const images = [{ "url": "https://example.com" }];
    return <div className="text-white w-4/5 m-auto">

        {/* My post: {params.slug} */}

        <div className="gallery my-5">
            <Gallery img={params.slug} />
        </div>

        <div className="customerReview  my-5">
            <CustomerReview />
        </div>


        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Heres how</span> we can help you...</h1>

        <div className="first">
            <Help />
            <Help />
            <Help />
        </div>

        <div className="plan mb-10">
            <div className="m-10">
                <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Select your</span> Plan</h1>
            </div>

            <div className="flex justify-between w-5/6 m-auto">
                <Plan />
                <Plan />
                <Plan />
            </div>
        </div>

        <div className="createCustom flex justify-center align-middle items-center m-12">

            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create your own plan as per your requerment.</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Create Now
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>

        <div className="calendar">
            
        </div>

    </div>
}