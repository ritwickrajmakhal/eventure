"use client";
import Members from '@/components/Members'
import Navbar from '@/components/Navbar'
import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Card2 from '@/components/Card2'
import ToTopBtn from '@/components/ToTopBtn'
import { MdOutlinePhone, MdOutlineLocationOn, MdOutlineMail } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const page = () => {

  // Initialize  AOS Animation

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, [])


  // Members Data Here

  const membersData = [
    {
      name: "Ritwick Raj Makhal",
      about: "about ritwick raj makhal",
      image: "/ritwick.jpg",
      delay: "100",
      type: "fade-right"
    },
    {
      name: "Rupam Bhakta",
      about: "about rupam bhakta",
      image: "/rupam.jpg",
      delay: "200",
      type: "fade-up"
    },
    {
      name: "Pritha Maity",
      about: "about pritha maity",
      image: "/subhadip.jpg",
      delay: "300",
      type: "fade-down"
    },
    {
      name: "Subhadip Gorai",
      about: "about subhadip gorai",
      image: "/subhadip.jpg",
      delay: "400",
      type: "fade-left"
    }
  ]

  //Events Cards Data Here

  const eventData = [
    {
      eventImage: "./Events/img1.webp",
      eventName: "Wedding Ceremony"
    },
    {
      eventImage: "./Events/img2.webp",
      eventName: "Birthday Party"
    },
    {
      eventImage: "./Events/img3.webp",
      eventName: "Open Concerts"
    },
    {
      eventImage: "./Events/img4.webp",
      eventName: "Food Festival"
    },
    {
      eventImage: "./Events/img5.webp",
      eventName: "Ring Ceremony"
    },
    {
      eventImage: "./Events/img6.webp",
      eventName: "Concerts"
    },
    {
      eventImage: "./Events/img7.webp",
      eventName: "Festivals"
    },
    {
      eventImage: "./Events/img8.webp",
      eventName: "DJ"
    },
    {
      eventImage: "./Events/img9.webp",
      eventName: "Conferences"
    },
    {
      eventImage: "./Events/img10.webp",
      eventName: "Private Concerts"
    },
  ]
  return (
    <>

      {/* Arrow Button */}

      <section>
        <ToTopBtn />
      </section>

      {/* Hero Section */}

      <section>
        <div className='before:content-[""] before:absolute before:top-[0] before:w-full before:h-screen before:bg-[rgba(0,0,0,0.6)] bg-[url("../public/hero.jpg")] bg-cover w-full h-screen fixed top-0 -z-50'>

        </div>
      </section>
      <section data-aos='fade-in' className=' flex flex-col items-center my-10 justify-center h-[70vh]'>
        <div className='text-white md:text-[60px] text-[40px] py-5 font-bold'>
          ABOUT US
        </div>
        <div className='lg:w-[25vw] md:w-[80vw] w-[80vw] h-fit text-white text-center'>
          Welcome to Eventure, Your Personal Event Organiser, where we bring your events to life. Our passion is creating unforgettable experiences that leave a lasting impression. Whether it's a corporate gathering, a milestone celebration, or a grand opening, we are here to make it extraordinary.
        </div>
      </section>


      {/* About Section */}

      <section data-aos='fade-up' className='w-screen h-[100vh] lg:h-[75vh] lg:flex'>
        <div className='lg:w-1/2 w-full h-1/2 lg:h-full max-[450px]:w-screen px-10 bg-white '>
          <div className='w-[30px] text-[70px] font-bold'>
            Our Story
          </div>
          <div className='py-10 hover:font-bold hover:text-xl transition-all cursor-pointer w-fit'><u>Read More</u></div>
        </div>
        <div className='lg:w-1/2 w-full h-1/2 lg:h-full bg-black max-[450px]:w-screen max-[450px]:text-xl text-white text-[20px] max-[780px]:text-[15px] flex flex-col items-center justify-center'>
          <div className='w-[75%] py-5 font-bold'>
            Get to Know Us
          </div>
          <div className='w-[75%] max-[450px]:text-sm'>
            This platform is a user-friendly web interface that simplifies event planning and management. It enables organizers to create events, send invitations with QR codes, and manage secure entry. Real-time tracking allows monitoring of participant attendance, ensuring a seamless event experience.
          </div>
        </div>
      </section>


      {/* Team Members Section */}

      <section className='w-screen' data-aos='fade-up'>
        <div className='bg-[rgba(0,0,0,0.7)] m-auto py-5 e w-[80vw] h-auto flex flex-col'>
          <div className='text-lime-400 text-[20px] lg:text-[50px] text-center py-5 font-bold'>Meet The Mans Behind The Magic</div>
          <div className='flex justify-around flex-col items-center lg:flex-row lg:justify-around'>
            {membersData.slice(0, 4).map((data, index) => (
              <Members
                key={index}
                name={data.name}
                about={data.about}
                image={data.image}
                delay={data.delay}
                type={data.type}
              />
            ))}
          </div>
          <button className='bg-lime-500 lg:w-[200px] lg:h-[60px] w-[150px] h-[40px] text-[13px] lg:text-[17px] font-bold hover:bg-lime-200 hover:text-xl transition-all self-center'><a href='/events'>Let's Plan Together</a></button>
        </div>
      </section>

      {/* Event Showcase */}

      <section data-aos='fade-up'>
        <div className='lg:text-[60px] text-[30px] font-bold text-center my-5 text-lime-400'>Event Showcase</div>
        <div className='h-auto flex justify-center my-5 flex-wrap gap-10'>
          {eventData.slice(0, 10).map((data, index) => (
            <Card2
              key={index}
              eventImage={data.eventImage}
              eventName={data.eventName}
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}

      <section data-aos='fade-up' className='w-screen h-fit flex flex-col items-center bg-black p-5'>
        <div className='flex w-screen md:flex-row flex-col items-center'>
          <div className=' gap-10 py-5  md:w-1/2 px-[10vw] font-serif flex flex-col items-center'>
            <div className='md:text-[60px] text-[40px] font-bold text-white'>
              Contact
            </div>
            <div className='text-white w-full gap-10 flex items-center'>
              <div className='w-fit text-[40px]'><MdOutlineLocationOn /></div>
              <div>National Highway 6, Banitabla, Uluberia, Howrah, West Bengal 711316</div>
            </div>
            <div className='text-white w-full gap-10 flex items-center'>
              <div className='w-fit text-[35px]'><MdOutlinePhone /></div>
              <div>+91 8391037376</div>
            </div>
            <div className='text-white w-full gap-10 flex items-center'>
              <div className='w-fit text-[35px]'><MdOutlineMail /></div>
              <div>official@eveture.com</div>
            </div>
            <div className='text-white w-full gap-10 flex items-center'>
              <div className='w-fit text-[35px]'><BiLike /></div>
              <div className='flex gap-3'><FaFacebook /><FaGithub /><FaXTwitter /></div>
            </div>
          </div>
          <div className='md:w-1/2'>
            <iframe className='w-[90%] h-[50vh]' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5665.106380137488!2d88.08114767067778!3d22.479693618649698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02843a3e865dc5%3A0xe175b11added28f9!2sCalcutta%20Institute%20of%20Technology%20(CIT)!5e0!3m2!1sen!2sin!4v1725290534956!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <button className='bg-lime-500 w-[170px] h-[60px] text-[20px] my-8 font-bold hover:bg-lime-200 hover:text-[25px] transition-all'><a href='/contact'>Contact Us</a></button>
      </section>
    </>
  )
}


export default page
