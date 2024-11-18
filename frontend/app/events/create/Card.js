import Image from "next/image";

const Card = ({ id, title, description, image, onSelect, isSelected }) => {
  return (
    <div
      className={`max-w-sm flex-shrink-0 cursor-pointer transition-all duration-300 
        ${isSelected ? "border-blue-600 border-2 grayscale-0" : "border border-gray-300"}
        filter grayscale hover:grayscale-0 rounded-lg shadow-lg overflow-hidden relative`}
      onClick={() => onSelect(isSelected ? null : id)}
    >
      {/* Card Image */}
      <Image
        src={image}
        alt={title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      
      {/* Card Content */}
      <div className="p-4">
        <h5 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h5>
        <p className="text-gray-700 dark:text-gray-400">{description}</p>
      </div>
      
      {/* Overlay when selected */}
      {isSelected && <div className="absolute inset-0 bg-blue-500 opacity-25"></div>}
    </div>
  );
};

export default Card;