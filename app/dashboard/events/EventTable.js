import { Table } from "flowbite-react";

const EventTable = ({ events }) => (
  <div className="overflow-x-auto">
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>Event name</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>createdAt</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {events?.map(({ id, attributes: { name, status, createdAt } }) => (
          <Table.Row key={id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {name}
            </Table.Cell>
            <Table.Cell>{status}</Table.Cell>
            <Table.Cell>{new Date(createdAt).toLocaleDateString('en-GB')}</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default EventTable;