import { Label } from "flowbite-react";
import Plan from "@/components/Plan";

const PlanSelector = ({ selectedPlan, eventTemplate }) => {
  return (
    <>
      {eventTemplate && (
        <div className="col-span-full mb-3">
          <Label htmlFor="eventTemplate" value="Select a Plan" />
          <div className="flex overflow-x-auto pt-2 gap-2">
            {selectedPlan ? (
              <Plan
                planSelected
                slug={eventTemplate.attributes.slug}
                price={selectedPlan.price}
                premiumServices={
                  eventTemplate.attributes.plans.find(
                    (plan) => plan.type === "Premium"
                  )?.services.data || []
                }
                services={selectedPlan.services.data}
                type={selectedPlan.type}
              />
            ) : (
              eventTemplate.attributes.plans.map((plan, index) => (
                <Plan
                  slug={eventTemplate.attributes.slug}
                  key={index}
                  price={plan.price}
                  premiumServices={
                    eventTemplate.attributes.plans.find(
                      (plan) => plan.type === "Premium"
                    )?.services.data || []
                  }
                  services={plan.services.data}
                  type={plan.type}
                />
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PlanSelector;
