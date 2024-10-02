import React from "react";

const Footer = ({ footer }) => {
  const sections = [
    { title: "Company", links: "Company" },
    { title: "Help center", links: "Help center" },
    { title: "Legal", links: "Legal" },
    { title: "Download", links: "Download" },
  ];

  function getLinksByCategory(category) {
    return footer.links.filter((link) => link.category === category);
  }

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {section.title}
              </h2>
              {getLinksByCategory(section.links).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.isExternal ? "_blank" : "_self"}
                  className="block mb-4 text-gray-500 dark:text-gray-400 hover:underline"
                >
                  {link.text}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            {footer.copyright}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;