// pages/HowItWorksSection.js
import { FaCalendarAlt, FaEnvelopeOpenText, FaChartBar, FaCheckCircle } from 'react-icons/fa';
import { DynamicIcon } from "@/components/DynamicIcon";

export default function HowItWorksSection({ howitworks }) {
    return (
        <section className='py-12 px-3'>
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold dark:text-gray-50">How It Works</h2>
                <p className="mt-4 text-gray-50">A simple 4-step process to make your events a success.</p>
            </div>

            <div className="grid gap-10 mt-12 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                {howitworks.map((step) => (
                    <div key={step.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transform transition-all hover:scale-105">
                        <div className="text-gray-800 text-4xl">
                            <DynamicIcon iconName={step.icon} />
                        </div>
                        <h3 className="text-xl text-gray-800 font-semibold mt-4">{step.heading}</h3>
                        <p className="mt-2 text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}