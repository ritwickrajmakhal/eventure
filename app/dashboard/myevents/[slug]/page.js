"use client";
import { HiCalendar } from "react-icons/hi";
import { Timeline } from "flowbite-react";

const page = () => {
    return (
        <div>
            <div className="mb-4 dark:bg-gray-800 bg-white rounded-lg lg:p-4 p-2">
                <h2 className="text-2xl font-bold mb-2">
                    Event Name
                </h2>
                <p className="mb-2"><strong>Description:</strong>
                    Event Description
                </p>
                <p className="mb-2"><strong>Participants:</strong> 200</p>
            </div>
            <div className="flex justify-center">
                <Timeline>
                    <Timeline.Item>
                        <Timeline.Point icon={HiCalendar} />
                        <Timeline.Content>
                            <Timeline.Time>February 2022</Timeline.Time>
                            <Timeline.Title>Event created</Timeline.Title>
                            <Timeline.Body>
                                The event was created and the initial details were set up.
                            </Timeline.Body>
                        </Timeline.Content>
                    </Timeline.Item>
                    <Timeline.Item>
                        <Timeline.Point icon={HiCalendar} />
                        <Timeline.Content>
                            <Timeline.Time>March 2022</Timeline.Time>
                            <Timeline.Title>Send Invitation</Timeline.Title>
                            <Timeline.Body>
                                Invitations were sent to the participants.
                            </Timeline.Body>
                        </Timeline.Content>
                    </Timeline.Item>
                    <Timeline.Item>
                        <Timeline.Point icon={HiCalendar} />
                        <Timeline.Content>
                            <Timeline.Time>April 2022</Timeline.Time>
                            <Timeline.Title>Event organized</Timeline.Title>
                            <Timeline.Body>
                                The event was organized successfully.
                            </Timeline.Body>
                        </Timeline.Content>
                    </Timeline.Item>
                    <Timeline.Item>
                        <Timeline.Point icon={HiCalendar} />
                        <Timeline.Content>
                            <Timeline.Time>May 2022</Timeline.Time>
                            <Timeline.Title>Event completed</Timeline.Title>
                            <Timeline.Body>
                                The event was completed successfully.
                            </Timeline.Body>
                        </Timeline.Content>
                    </Timeline.Item>
                </Timeline>
            </div>
        </div>
    )
}

export default page