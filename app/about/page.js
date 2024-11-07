import request from "@/lib/request"
import Members from "@/components/Members";
import Link from "next/link";
import Card2 from "@/components/Card2";
import { MdOutlinePhone, MdOutlineLocationOn, MdOutlineMail } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import dynamic from "next/dynamic";
import { DynamicIcon } from "@/components/DynamicIcon";

// Dynamically import the client-side part
const AboutPage = dynamic(() => import("./AboutPage"), {
  ssr: false,
});

const page = async () => {
  const res = await request("/api/about?populate=members.avatar,event_showcases.thumbnail,background,map,social_links");
  const { attributes: { heading, description, our_story, get_to_know_us, members, event_showcases, background, map, mobile, email, social_links } } = res.data;
  return (
    <>
      {/* Arrow Button */}
      <AboutPage />

      {/* Hero Section */}

      <section>
        <div
          className="before:content-[''] before:absolute before:top-0 before:w-full before:h-screen before:bg-[rgba(0,0,0,0.6)] w-full h-screen fixed top-0 -z-50 bg-cover"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL || ''}${background.data?.attributes.url})`,
          }}
        ></div>
      </section>
      <section
        data-aos="fade-in"
        className=" flex flex-col items-center my-10 justify-center h-[70vh]"
      >
        <div className="text-white md:text-[60px] text-[40px] py-5 font-bold">{heading}</div>
        <div className="lg:w-[25vw] md:w-[80vw] w-[80vw] h-fit text-white text-center">{description}</div>
      </section>

      {/* About Section */}

      <section
        data-aos="fade-up"
        className="h-[100vh] lg:h-[75vh] lg:flex"
      >
        <div className="lg:w-1/2 w-full h-1/2 lg:h-full max-[450px]:w-screen px-10 bg-white ">
          <div className="w-[30px] text-[70px] font-bold">Our Story</div>
          <div className="py-10 hover:font-bold hover:text-xl transition-all cursor-pointer w-fit">
            {our_story}
            <u>Read More</u>
          </div>
        </div>
        <div className="lg:w-1/2 w-full h-1/2 lg:h-full bg-black max-[450px]:w-screen max-[450px]:text-xl text-white text-[20px] max-[780px]:text-[15px] flex flex-col items-center justify-center">
          <div className="w-[75%] py-5 font-bold">Get to Know Us</div>
          <div className="w-[75%] max-[450px]:text-sm">{get_to_know_us}</div>
        </div>
      </section>

      {/* Team Members Section */}

      <section data-aos="fade-up">
        <div className="bg-[rgba(0,0,0,0.7)] m-auto py-5 e w-[80vw] h-auto flex flex-col">
          <div className="text-lime-400 text-[20px] lg:text-[50px] text-center py-5 font-bold">
            Meet The Mans Behind The Magic
          </div>
          <div className="flex justify-around flex-col items-center lg:flex-row lg:justify-around">
            {members?.slice(0, 4).map((member) => {
              const { id, name, description, avatar } = member;
              return (<Members
                key={id}
                name={name}
                about={description}
                image={`${process.env.NEXT_PUBLIC_API_URL || ""}${avatar.data.attributes.url}`}
                delay="100"
                type="fade-up"
              />)
            })}
          </div>
          <button className="bg-lime-500 lg:w-[200px] lg:h-[60px] w-[150px] h-[40px] text-[13px] lg:text-[17px] font-bold hover:bg-lime-200 hover:text-xl transition-all self-center">
            <Link href="/events">Let&apos;s Plan Together</Link>
          </button>
        </div>
      </section>

      {/* Event Showcase */}

      <section data-aos="fade-up">
        <div className="lg:text-[60px] text-[30px] font-bold text-center my-5 text-lime-400">
          Event Showcase
        </div>
        <div className="h-auto flex justify-center my-5 flex-wrap gap-10">
          {event_showcases?.data.slice(0, 10).map((event_template) => {
            const { id, attributes: { title, thumbnail } } = event_template;
            return (
              <Card2
                key={id}
                eventImage={`${process.env.NEXT_PUBLIC_API_URL || ""}${thumbnail.data.attributes.url}`}
                eventName={title}
              />
            )
          })}
        </div>
      </section>

      {/* Contact Section */}

      <section
        data-aos="fade-up"
        className="h-fit flex flex-col items-center bg-black p-5"
      >
        <div className="flex md:flex-row flex-col items-center">
          <div className=" gap-10 py-5  md:w-1/2 px-[10vw] font-serif flex flex-col items-center">
            <div className="md:text-[60px] text-[40px] font-bold text-white">
              Contact
            </div>
            <div className="text-white w-full gap-10 flex items-center">
              <div className="w-fit text-[40px]">
                <MdOutlineLocationOn />
              </div>
              <div>{map.address}</div>
            </div>
            <div className="text-white w-full gap-10 flex items-center">
              <div className="w-fit text-[35px]">
                <MdOutlinePhone />
              </div>
              <div>{mobile}</div>
            </div>
            <div className="text-white w-full gap-10 flex items-center">
              <div className="w-fit text-[35px]">
                <MdOutlineMail />
              </div>
              <div>{email}</div>
            </div>
            <div className="text-white w-full gap-10 flex items-center">
              <div className="w-fit text-[35px]">
                <BiLike />
              </div>
              <div className="flex gap-3">
                {social_links?.map((social_link) => {
                  const { id, url, isExternal, icon } = social_link;
                  return (
                    <Link href={url} key={id} target={isExternal && "_blank"}>
                      <DynamicIcon iconName={icon} className="text-white text-[35px] hover:text-lime-400 transition-all" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <iframe
              className="w-[90%] h-[50vh]"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${map.coordinates.lat},${map.coordinates.lng}&zoom=14&maptype=satellite`}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <button className="bg-lime-500 w-[170px] h-[60px] text-[20px] my-8 font-bold hover:bg-lime-200 hover:text-[25px] transition-all">
          <Link href="/contact">Contact Us</Link>
        </button>
      </section>
    </>
  )
}

export default page