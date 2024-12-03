import React from 'react'
import FAQ from './FAQ'
import request from '@/lib/request'

const page = async () => {
    const res = await request('/api/fa-qs-page?populate=*');
    const faqs_page = res.data?.attributes;
  return (
    <FAQ faqs_page={faqs_page}/>
  )
}

export default page