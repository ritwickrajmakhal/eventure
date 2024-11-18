// DynamicIcon component definition
export const DynamicIcon = async ({ iconName = 'fa/FaFileExcel', ...props }) => {
  iconName = iconName.slice(0, 2).toLocaleLowerCase() + "/" + iconName;
  const [library, iconComponent] = iconName.split('/');
  
  // If either the library or icon component is not provided, return null
  if (!library || !iconComponent) return null;

  const lib = library.toLowerCase();
  let ReactIcons = await import(`react-icons/ai`); // Default to importing from 'ai'

  // Dynamically import the corresponding icon library based on the library name
  if (lib === 'bs') {
    ReactIcons = await import(`react-icons/bs`);
  } else if (lib === 'bi') {
    ReactIcons = await import(`react-icons/bi`);
  } else if (lib === 'di') {
    ReactIcons = await import(`react-icons/di`);
  } else if (lib === 'fi') {
    ReactIcons = await import(`react-icons/fi`);
  } else if (lib === 'fc') {
    ReactIcons = await import(`react-icons/fc`);
  } else if (lib === 'fa') {
    ReactIcons = await import(`react-icons/fa6`);
  } else if (lib === 'gi') {
    ReactIcons = await import(`react-icons/gi`);
  } else if (lib === 'go') {
    ReactIcons = await import(`react-icons/go`);
  } else if (lib === 'gr') {
    ReactIcons = await import(`react-icons/gr`);
  } else if (lib === 'hi') {
    ReactIcons = await import(`react-icons/hi`);
  } else if (lib === 'im') {
    ReactIcons = await import(`react-icons/im`);
  } else if (lib === 'io') {
    ReactIcons = await import(`react-icons/io`);
  } else if (lib === 'md') {
    ReactIcons = await import(`react-icons/md`);
  } else if (lib === 'ri') {
    ReactIcons = await import(`react-icons/ri`);
  } else if (lib === 'si') {
    ReactIcons = await import(`react-icons/si`);
  } else if (lib === 'ti') {
    ReactIcons = await import(`react-icons/ti`);
  } else if (lib === 'vsc') {
    ReactIcons = await import(`react-icons/vsc`);
  } else if (lib === 'wi') {
    ReactIcons = await import(`react-icons/wi`);
  } else if (lib === 'cg') {
    ReactIcons = await import(`react-icons/cg`);
  }

  // Get the icon component by its name
  const Icon = ReactIcons[iconComponent];
  
  // Render the icon with the provided props
  return Icon ? <Icon {...props} /> : null; // Render the icon or null if not found
};