import { Select, Label } from "flowbite-react";
import Link from "next/link";

const AudienceSelector = ({ audiences, onSelect }) => {
  return (
    <div>
      {/* Label and Link for creating a new audience */}
      <div className="mb-2 block">
        <Label htmlFor="audience" value="Target Audience - Don't have one? " />
        <Link href="/dashboard/audiences" className="hover:underline dark:text-blue-500">
          create one
        </Link>
      </div>
      
      {/* Audience dropdown */}
      <Select id="audience" required onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select an audience</option>
        {audiences?.map((audience) => {
          const { id, attributes: { name, details } } = audience;
          return (
            <option key={id} value={id}>
              {`${name} (${details.length} participants)`}
            </option>
          );
        })}
      </Select>
    </div>
  );
};

export default AudienceSelector;