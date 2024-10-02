const OrderSummary = ({ formData }) => {
  const { audience, venue, schedules, services } = formData;
  // calculate total duration in hours
  const totalDuration = schedules.reduce((acc, { start, end }) => acc + (end - start), 0) / 3600000;
  const totalParticipants = audience ? audience.attributes.details.length : 0;
  const totalServicesCost = services.reduce((acc, service) => acc + service.attributes.cost, 0);
  const totalVenueCost = venue ? venue.attributes.booking_cost : 0;
  const totalCost = (totalServicesCost + totalVenueCost) * totalDuration * totalParticipants;
  return (
    <div className="col-span-full xl:col-auto mt-3 bg-white p-3 rounded-lg shadow-sm dark:bg-gray-800">
      <h3 className="text-xl font-semibold">Order Summary</h3>
      <div className="mx-auto max-w-3xl">
        <div>
          <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
            <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {services?.map((service) => (
                  <tr key={service.id}>
                    <td className="whitespace-nowrap py-2 md:w-[384px]">
                      <div className="flex items-center gap-4">
                        <a href="#" className="hover:underline">
                          {service.attributes.title}
                        </a>
                      </div>
                    </td>
                    <td className="text-right text-base font-bold text-gray-900 dark:text-white">
                      ₹{service.attributes.cost}/-
                    </td>
                  </tr>
                ))}
                {venue && (
                  <tr>
                    <td className="whitespace-nowrap py-2">
                      <div className="flex items-center gap-4">
                        <a href="#" className="hover:underline">
                          {venue.attributes.name}
                        </a>
                      </div>
                    </td>
                    <td className="text-right text-base font-bold text-gray-900 dark:text-white">
                      ₹{venue.attributes.booking_cost}/-
                    </td>
                  </tr>
                )}
                {audience && (
                  <tr>
                    <td className="whitespace-nowrap py-2">
                      <div className="flex items-center gap-4">
                        <a href="#" className="hover:underline">
                          Total Participants
                        </a>
                      </div>
                    </td>
                    <td className="text-right text-base font-bold text-gray-900 dark:text-white">
                      x {totalParticipants}
                    </td>
                  </tr>
                )}

                {totalDuration > 0 && (
                  <tr>
                    <td className="whitespace-nowrap py-2">
                      <div className="flex items-center gap-4">
                        <a href="#" className="hover:underline">
                          Total Duration
                        </a>
                      </div>
                    </td>
                    <td className="text-right text-base font-bold text-gray-900 dark:text-white">
                      x {totalDuration} hours
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 space-y-6">
            <div className="space-y-4">
              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-lg font-bold text-gray-900 dark:text-white">
                  Total
                </dt>
                <dd className="text-lg font-bold text-gray-900 dark:text-white">
                  ₹{totalCost}/-
                </dd>
              </dl>
            </div>
            <div className="flex items-start sm:items-center">
              <input
                id="terms-checkbox-2"
                type="checkbox"
                defaultValue=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
              <label
                htmlFor="terms-checkbox-2"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {" "}
                I agree with the{" "}
                <a
                  href="#"
                  title=""
                  className="text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                  Terms and Conditions
                </a>{" "}
                of use of the platform.
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary