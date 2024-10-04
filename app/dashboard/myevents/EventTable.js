import { Table } from "flowbite-react";
import Link from "next/link";

const EventTable = ({ events }) => (
  <div className="overflow-x-auto">
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>Event name</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>createdAt</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">View</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {events?.map(({ id, attributes: { name, status, createdAt, slug } }) => (
          <Table.Row key={id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {name}
            </Table.Cell>
            <Table.Cell>{status}</Table.Cell>
            <Table.Cell>{new Date(createdAt).toLocaleDateString('en-GB')}</Table.Cell>
            <Table.Cell>
              <Link href={`/dashboard/myevents/${slug}`} className="hover:underline">View</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default EventTable;