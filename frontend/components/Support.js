import Link from 'next/link';
import { DynamicIcon } from './DynamicIcon';

export default function Support({ supports }) {
    return (
        <div className="py-16 px-3">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-grey-50">Support</h2>
                <p className="mt-4 dark:text-blue-300">
                    Need help? We&apos;ve got you covered. Explore our support options below.
                </p>
            </div>

            <div className="grid gap-10 mt-12 sm:grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto">
                {/* FAQs */}
                {supports.map((support) => (
                    <div key={support.id} className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transform transition-all hover:scale-105">
                        <div className="text-blue-900 text-5xl mb-4">
                            <DynamicIcon iconName={support.icon} />
                        </div>
                        <h3 className="text-2xl text-gray-800 font-semibold">{support.heading}</h3>
                        <p className="mt-2 text-gray-600">
                            {support.description}
                        </p>
                        
                        <Link
                            href={support.link.url}
                            className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                        >
                            {support.link.text}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
