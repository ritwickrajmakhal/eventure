import React from 'react'
import Link from 'next/link'
import Card3 from '@/components/Card3'

const page = () => {
  const cardData = [
    {
      className: "conference",
      img: "conference",
      heading: "Conference",
      paragraph:
        "Allow yourself to organize a conference succfully",
    },
    {
      className: "tradeShow",
      img: "tradeshow1",
      heading: "Trade Show",
      paragraph:
        "Allow yourself to organize a conference succfully",
    },
    {
      className: "engagement",
      img: "engagement",
      heading: "Engagement",
      paragraph:
        "Allow yourself to organize a conference succfully",
    },
    {
      className: "birthday",
      img: "birthday",
      heading: "Birthday",
      paragraph:
        "Allow yourself to organize a conference succfully",
    },
    {
      className: "cerimonial",
      img: "cerimonial",
      heading: "Cerimoni",
      paragraph:
        "Allow yourself to organize a conference succfully",
    },
    {
      className: "custom",
      img: "custom",
      heading: "Create Custom",
      paragraph:
        "Create your own event and colobarate with us and organize a grate event with us...",
    },
  ]
  return (
    <div className='text-white flex flex-col justify-center items-center'>

      {/* 1st row */}
      <div className="fearures flex mt-5 md:flex-row flex-col items-center gap-5 md:gap-5">
        {cardData.slice(0, 3).map((data, index) => (
          <Card3
            key={index}
            className={data.className}
            img={data.img + ".jpg"}
            heading={data.heading}
            paragraph={data.paragraph}
          />
        ))}
      </div>
      <div className="fearures flex m-5 md:flex-row flex-col items-center gap-5 md:gap-5">
        {cardData.slice(3, 6).map((data, index) => (
          <Card3
            key={index}
            className={data.className}
            img={data.img + ".jpg"}
            heading={data.heading}
            paragraph={data.paragraph}
          />
        ))}
      </div>


    </div >
  )
}

export default page
