import { Card, Badge, Timeline, Button } from 'flowbite-react';
import { HiCalendar } from 'react-icons/hi';

const EventDetails = ({ eventData }) => {
  const { name, description, status, venue, schedules, services, audiences } = eventData.attributes;
  const venueDetails = venue.data.attributes;
  const scheduleDetails = schedules.data;
  const serviceDetails = services.data;
  const audienceDetails = audiences.data[0].attributes.details;

  // Function stubs for buttons (you can integrate actual functionality)
  const handleCancelEvent = () => {
    alert("Event canceled!");
  };

  const handleSendInvitation = () => {
    alert("Invitations sent!");
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white dark:bg-gray-800 dark:text-gray-300 rounded-lg shadow-md">
      {/* Event Overview */}
      <Card className="mb-6 dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">{name}</h2>
        <p className="text-gray-700 dark:text-gray-400 text-center">{description}</p>
        <div className="text-center mt-4">
          <Badge className='inline-block'>
            {status}
          </Badge>
        </div>
      </Card>

      {/* Venue Details */}
      <Card className="mb-6 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Venue Details</h3>
        <div className="text-gray-700 dark:text-gray-400 space-y-2">
          <p><strong>Venue Name:</strong> {venueDetails.name}</p>
          <p><strong>Capacity:</strong> {venueDetails.capacity}</p>
          <p><strong>Booking Cost:</strong> ₹{venueDetails.bookingCost}</p>
          <p><strong>Description:</strong> {venueDetails.description}</p>
          <p><strong>Location:</strong> {venueDetails.map.address}</p>
        </div>
      </Card>

      {/* Event Schedule */}
      <Card className="mb-6 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Event Schedule</h3>
        <Timeline>
          {scheduleDetails.map((schedule) => (
            <Timeline.Item key={schedule.id}>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time className="dark:text-gray-400">
                  Start: {new Date(schedule.attributes.start).toLocaleString()} <br />
                  End: {new Date(schedule.attributes.end).toLocaleString()}
                </Timeline.Time>
                <Timeline.Title className="dark:text-white">{schedule.attributes.title}</Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>

      {/* Available Services */}
      <Card className="mb-6 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Services Offered</h3>
        <div className="grid grid-cols-2 gap-4">
          {serviceDetails.map((service) => (
            <div
              key={service.id}
              className="p-4 bg-blue-100 dark:bg-blue-800 rounded-md flex justify-between items-center"
            >
              <span className="dark:text-white">{service.attributes.title}</span>
              <Badge color="info">₹{service.attributes.cost}</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Audience List */}
      <Card className="mb-6 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Audience</h3>
        <div className="overflow-auto max-h-96">
          <table className="table-auto w-full text-left text-gray-700 dark:text-gray-400">
            <thead className="bg-gray-100 dark:bg-gray-700 dark:text-white">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">City</th>
                <th className="p-2">Occupation</th>
                <th className="p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {audienceDetails.map((audience, index) => (
                <tr key={index} className="border-t dark:border-gray-700">
                  <td className="p-2">{audience.name}</td>
                  <td className="p-2">{audience.city}</td>
                  <td className="p-2">{audience.occupation}</td>
                  <td className="p-2">{audience.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <Button
          color="failure"
          onClick={handleCancelEvent}
          className="dark:bg-red-700 dark:hover:bg-red-800"
        >
          Cancel Event
        </Button>
        <Button
          color="success"
          onClick={handleSendInvitation}
          className="dark:bg-green-700 dark:hover:bg-green-800"
        >
          Send Invitation
        </Button>
      </div>
    </div>
  );
};

export default EventDetails;