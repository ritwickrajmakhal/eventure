import { Button, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import request from "@/lib/request";
import showToast from "@/lib/toast";
import Select from 'react-select';

const Information = ({ user, setUser, session }) => {
  // Loading states for fetching and updating user information
  const [fetchCountryLoading, setFetchCountryLoading] = useState(false);
  const [fetchStateLoading, setFetchStateLoading] = useState(false);
  const [fetchCityLoading, setFetchCityLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [mounted, setMounted] = useState(false); // To check if the component is mounted

  useEffect(() => {
    setMounted(true);
  }, []);

  // fetch countries
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      setFetchCountryLoading(true);
      const res = await request("/api/countries");
      setCountries(res.data.map((country) => ({ value: country.id, label: country.attributes.name })));
      setFetchCountryLoading(false);
    };
    fetchCountries();
  }, []); // Empty dependency to ensure it runs only once

  // fetch states based on country
  const [states, setStates] = useState([]);
  useEffect(() => {
    const fetchStates = async () => {
      if (user?.country) {
        setFetchStateLoading(true);
        const res = await request(`/api/states?filters[country]=${user.country.id}`);
        setStates(res.data.map((state) => ({ value: state.id, label: state.attributes.name })));
        setFetchStateLoading(false);
      }
    };
    fetchStates();
  }, [user?.country]); // Run only when user.country changes

  // fetch cities based on state
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchCities = async () => {
      if (user?.state) {
        setFetchCityLoading(true);
        const res = await request(`/api/cities?filters[state]=${user.state.id}`);
        setCities(res.data.map((city) => ({ value: city.id, label: city.attributes.name })));
        setFetchCityLoading(false);
      }
    };
    fetchCities();
  }, [user?.state]); // Run only when user.state changes

  // Update user information
  const updateInformation = async (e) => {
    e.preventDefault();
    if (session) {
      setUpdateLoading(true);
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
      setUpdateLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  if (!mounted) return null; // Render nothing on the server
  return (
    <div className="col-span-2">
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <h3 className="mb-4 text-xl font-semibold dark:text-white">
          General information
        </h3>
        <form onSubmit={updateInformation} >
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="first-name" value="First Name" />
              <TextInput id="first-name" type="text" name="firstName" placeholder="First Name" value={user?.firstName || ""} onChange={handleInputChange} />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="last-name" value="Last Name" />
              <TextInput id="last-name" name="lastName" type="text" placeholder="Last Name" value={user?.lastName || ""} onChange={handleInputChange} />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="country" value="Country" />
              <Select
                placeholder="Select Country"
                id="country"
                name="country"
                options={countries}
                value={countries.find((country) => country.value === user?.country?.id)}
                onChange={(selectedOption) =>
                  setUser({ ...user, country: { id: selectedOption.value, name: selectedOption.label } })
                }
                isLoading={fetchCountryLoading}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="state" value="State" />
              <Select
                placeholder="Select State"
                id="state"
                name="state"
                options={states}
                value={states.find((state) => state.value === user?.state?.id)}
                onChange={(selectedOption) =>
                  setUser({ ...user, state: { id: selectedOption.value, name: selectedOption.label } })
                }
                isLoading={fetchStateLoading}
                isDisabled={!user?.country}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="city" value="City" />
              <Select
                placeholder="Select City"
                id="city"
                name="city"
                options={cities}
                value={cities.find((city) => city.value === user?.city?.id)}
                onChange={(selectedOption) =>
                  setUser({ ...user, city: { id: selectedOption.value, name: selectedOption.label } })
                }
                isLoading={fetchCityLoading}
                isDisabled={!user?.state}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="street-address" value="Street Address" />
              <TextInput id="street-address" type="text" name="street_address" placeholder="e.g. 1234 Main St" value={user?.street_address || ""} onChange={handleInputChange} />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="email" value="Email" />
              <TextInput id="email" type="email" name="email" placeholder="example@company.com" value={user?.email || ""} onChange={handleInputChange} />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="phone-number" value="Phone Number" />
              <TextInput id="phone-number" type="number" name="phoneNumber" placeholder="e.g. +(12)3456 789" value={user?.phoneNumber || ""} onChange={handleInputChange} />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="organization" value="Organization" />
              <TextInput id="organization" type="text" placeholder="Company Name" value={user?.organization || ""} onChange={handleInputChange} name="organization" />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="zip-code" value="Zip/postal code" />
              <TextInput id="zip-code" type="number" name="zipCode" placeholder={123456} value={user?.zipCode || ""} onChange={handleInputChange}
              />
            </div>
            <div className="col-span-6 sm:col-full flex items-center">
              <Button color="blue" type="submit" disabled={updateLoading}>
                {updateLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Information;