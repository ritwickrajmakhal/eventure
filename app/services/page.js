import request from "@/lib/request";
import "./style.css";

const page = async () => {
  const res = await request("/api/services-page?populate=services");
  const { services } = res.data.attributes;

  return (
    <div className="text-white">
      {/* Font */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
      ></link>

      {/* service section  */}
      <section className="services" id="services">
        <h1 className="heading">
          Our <span>Services</span>
        </h1>
        {/* cards */}
        <div className="box-container">
          {services.map((service, index) => (
            <div className="box" key={index}>
              <i className={service.icon}></i>
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
