import React from 'react'

function page() {
  return (
    <>
      <div className='text-white'>
        <div className='text-7xl text-center font-bold font-Inter mt-24'>
          <h1 className='m-5'>Easily Organize your events with</h1>
          <h1 className='text-slate-400'> EVENTURE</h1>
        </div>
        <div className='text-center m-16 text-lg text-slate-100'>
          <p className=''>This platform is a user-friendly web interface that simplifies event planning and management. It enables organizers to create events, send invitations with QR codes, and manage secure entry. Real-time tracking allows monitoring of participant attendance, ensuring a seamless event experience.</p>
        </div>

        <div className='flex justify-center items-center gap-5'>
          <button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Creat a new event</button>
          <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Learn More</button>
        </div>



        {/* Key features section */}
        <div className='flex flex-col items-center justify-center gap-10'>
          <p className="bg-white h-[1.5px] opacity-10 w-3/4 m-10"></p>

          <div className='fearures flex items-center gap-10'>
            <div className="eventCreation">
              <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Easy Event Creation</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Eventure allows organizers to effortlessly set up events. This streamlined approach ensures that even users with minimal technical skills can quickly create and manage events.</p>
              </a>
            </div>

            <div className="Invitation">
              <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Invitation</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">This platform enables organizers to send personalized digital invitations to participants. Each invitation includes a unique QR code for secure and streamlined entry management.</p>
              </a>
            </div>
          </div>

          <div className='fearures flex items-center gap-10'>
            <div className="QRCodeManagemen">
              <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">QR Code Managemen</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">The QR Code Management system provides each participant with a unique QR code for event entry. This ensures secure access and real-time tracking of attendees.</p>
              </a>
            </div>

            <div className="RealTimeParticipantTracking">
              <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Real-Time Participant Tracking</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">The platform offers real-time participant tracking, allowing organizers to monitor attendance and engagement instantly.This feature provides valuable insights.</p>
              </a>
            </div>
            <div className="SecureAccessManagement">
              <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Secure Access Management</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">This ensures only authorized participants enter events by verifying unique QR codes. This system enhances event security and prevents unauthorized access.</p>
              </a>
            </div>
          </div>
          <p className="bg-white h-[1.5px] opacity-10 w-3/4 m-10"></p>
        </div>
        {/* Feature section end here */}


        

      </div>
    </>
  )
}

export default page