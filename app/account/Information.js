import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import request from "@/lib/request";
import showToast from "@/lib/toast";


const Information = ({ user, setUser, session }) => {
  const [loading, setLoading] = useState(false);

  const updateInformation = async () => {
    if (session) {
      setLoading(true);
      const res = await request(`/api/users/${session.id}`, {
        method: "PUT",
        body: Object.fromEntries(
          Object.entries(user).filter(([key, value]) => value)
        ),
        headers: {
          Authorization: "Bearer " + session.jwt,
        },
      });
      res.error ? showToast("error", res.error.message) : showToast("success", "Information updated successfully");
      setLoading(false);
    }
  };
  return (
    <div className="col-span-2">
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <h3 className="mb-4 text-xl font-semibold dark:text-white">
          General information
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateInformation();
          }}
        >
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="first-name" value="First Name" />
              <TextInput
                id="first-name"
                type="text"
                name="first-name"
                placeholder="First Name"
                value={user?.firstName || ""}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="last-name" value="Last Name" />
              <TextInput
                id="last-name"
                name="last-name"
                type="text"
                placeholder="Last Name"
                value={user?.lastName || ""}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="country" value="Country" />
              <TextInput
                id="country"
                name="country"
                type="text"
                placeholder="United States"
                value={user?.country || ""}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="state" value="State" />
              <TextInput
                id="state"
                name="state"
                type="text"
                placeholder="e.g. West Bengal"
                value={user?.state || ""}
                onChange={(e) => setUser({ ...user, state: e.target.value })}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="city" value="City" />
              <TextInput
                id="city"
                type="text"
                name="city"
                placeholder="e.g. San Francisco"
                value={user?.city || ""}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="address" value="Address" />
              <TextInput
                id="address"
                type="text"
                name="address"
                placeholder="e.g. California"
                value={user?.address || ""}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                name="email"
                placeholder="example@company.com"
                value={user?.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="phone-number" value="Phone Number" />
              <TextInput
                id="phone-number"
                type="number"
                name="phone-number"
                placeholder="e.g. +(12)3456 789"
                value={user?.phoneNumber || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="organization" value="Organization" />
              <TextInput
                id="organization"
                type="text"
                placeholder="Company Name"
                value={user?.organization || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    organization: e.target.value,
                  })
                }
                name="organization"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="zip-code" value="Zip/postal code" />
              <TextInput
                id="zip-code"
                type="number"
                name="zip-code"
                placeholder={123456}
                value={user?.zipCode || ""}
                onChange={(e) => setUser({ ...user, zipCode: e.target.value })}
              />
            </div>
            <div className="col-span-6 sm:col-full flex items-center">
              <Button color="blue" type="submit">
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Information;
