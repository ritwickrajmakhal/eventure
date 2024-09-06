import "./style.css";

const page = () => {
  const data = [
    {
        id: 1,
        icon: "fas fa-map-marker-alt",
        title: "venue selection",
        desc: "Users access websites using web browsers and can navigate through the pages by clicking on links or using menus. A web service is a technological component of the internet that facilitates communication and data exchange between different software applications.",
      },
    {
      id: 2,
      icon: "fas fa-envelope",
      title: "invitation card",
      desc: "Users access websites using web browsers and can navigate through the pages by clicking on links or using menus. A web service is a technological component of the internet that facilitates communication and data exchange between different software applications.",
    },
    {
      id: 3,
      icon: "fas fa-music",
      title: "entertainment",
      desc: "Users access websites using web browsers and can navigate through the pages by clicking on links or using menus. A web service is a technological component of the internet that facilitates communication and data exchange between different software applications.",
    },
    {
      id: 4,
      icon: "fas fa-utensils",
      title: "food and drinks",
      desc: "Users access websites using web browsers and can navigate through the pages by clicking on links or using menus. A web service is a technological component of the internet that facilitates communication and data exchange between different software applications.",
    },
    {
      id: 5,
      icon: "fas fa-photo-video",
      title: "photos and videos",
      desc: "Users access websites using web browsers and can navigate through the pages by clicking on links or using menus. A web service is a technological component of the internet that facilitates communication and data exchange between different software applications.",
    },
    {
      id: 6,
      icon: "fas fa-birthday-cake",
      title: "custom food",
      desc: "Users access websites using web browsers and can navigate through the pages by clicking on links or using menus. A web service is a technological component of the internet that facilitates communication and data exchange between different software applications.",
    },
  ];
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
          {" "}
          Our <span>Services</span>
        </h1>
        {/* cards */}
        <div className="box-container">
          {data.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </section>
    </div>
  );
};

const Card = ({ card }) => {
  return (
    <div className="box">
      <i className={card.icon}></i>
      <h3>{card.title}</h3>
      <p>{card.desc}</p>
    </div>
  );
};

export default page;
