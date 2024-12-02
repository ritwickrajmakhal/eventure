"use client";

import { Avatar, Blockquote, Rating } from "flowbite-react";

export function TestimonialSection({ testimonials }) {
    return (
        <section className="pt-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
                <div className="flex flex-wrap justify-center">
                    {testimonials.map((testimonial) => (
                        <figure key={testimonial.id} className="max-w-screen-md mx-auto mb-8">
                            <div className="mb-4 flex items-center">
                                <Rating size="md">
                                    {testimonial.rating === 'One star' && <Rating.Star />}
                                    {testimonial.rating === 'Two stars' && <>
                                        <Rating.Star />
                                        <Rating.Star />
                                    </>}
                                    {testimonial.rating === 'Three stars' && <>
                                        <Rating.Star />
                                        <Rating.Star />
                                        <Rating.Star />
                                    </>}
                                    {testimonial.rating === 'Four stars' && <>
                                        <Rating.Star />
                                        <Rating.Star />
                                        <Rating.Star />
                                        <Rating.Star />
                                    </>}
                                    {testimonial.rating === 'Five stars' && <>
                                        <Rating.Star />
                                        <Rating.Star />
                                        <Rating.Star />
                                        <Rating.Star />
                                        <Rating.Star />
                                    </>}
                                </Rating>

                            </div>
                            <Blockquote>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">&apos;{testimonial.quote}&apos;</p>
                            </Blockquote>
                            <figcaption className="mt-6 flex items-center space-x-3">
                                {testimonial.avatar.data ? <Avatar rounded size="xs" img={`${process.env.NEXT_PUBLIC_API_URL || ""}${testimonial.avatar.data?.attributes.url}`} alt={testimonial.author} /> : <Avatar rounded size="xs" />}
                                <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
                                    <cite className="pr-3 font-medium text-gray-900 dark:text-white">{testimonial.author}</cite>
                                    <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</cite>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TestimonialSection;