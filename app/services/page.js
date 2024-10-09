import request from "@/lib/request";
import "./style.css";
import { DynamicIcon } from "@/components/DynamicIcon";

const page = async () => {
  const res = await request("/api/services-page?populate=services");
  const { services } = res.data.attributes;

  return (
    <div className="text-white">
      {/* service section  */}
      <section className="services" id="services">
        <h1 className="heading">
          Our <span>Services</span>
        </h1>
        {/* cards */}
        <div className="box-container">
          {services.map((service, index) => (
            <div className="box" key={index}>
              <DynamicIcon className="mx-auto w-10 h-10" iconName={service.icon} />
              <h3>{service.heading}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
