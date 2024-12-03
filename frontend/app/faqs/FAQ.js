"use client";

import { useState } from 'react';
import { Accordion, Button } from 'flowbite-react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Link from 'next/link';

export default function FAQ({ faqs_page }) {

  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs_page.questions?.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen dark:text-white p-8">
      {/* Header Section */}
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in">
          {faqs_page.heading}
        </h1>
        <p className="text-lg opacity-90">
          {faqs_page.description}
        </p>
      </header>

      {/* Search Bar */}
      <div className="my-6 flex justify-center">
        <input
          type="text"
          placeholder="Search questions..."
          className="p-3 w-full max-w-lg rounded-lg dark:text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-lg transition-transform transform hover:scale-105"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* FAQ List */}
      <Accordion>
        {filteredFaqs.map((faq, index) => (
          <Accordion.Panel key={index}>
            <Accordion.Title>{faq.question}</Accordion.Title>
            <Accordion.Content className='dark:bg-gray-800'>
              <BlocksRenderer content={faq.answer} blocks={{ link: ({ children, url }) => <Link target='_blank' className='hover:underline text-blue-400' href={url}>{children}</Link>, }} />
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>

      {/* Contact Us Section */}
      <div className="mt-10 flex justify-center flex-col items-center">
        <p className="text-lg">
          {faqs_page?.footer_text}
        </p>
        <Button as={Link} target={'_blank' && faqs_page.contact_btn.isExternal} href={faqs_page.contact_btn.url} className='mt-6' pill>{faqs_page.contact_btn.text}</Button>
      </div>
    </div>
  );
}
