export function serviceReadiness(configuration: {
  contactDelivery: boolean;
  durableOutbox: boolean;
  deliveryEvents: boolean;
  syntheticMonitor: boolean;
}) {
  const checks = {
    contactDelivery: configuration.contactDelivery
      ? "configured"
      : "unconfigured",
    durableOutbox: configuration.durableOutbox
      ? "configured"
      : "unconfigured",
    deliveryEvents: configuration.deliveryEvents
      ? "configured"
      : "unconfigured",
    syntheticMonitor: configuration.syntheticMonitor
      ? "configured"
      : "unconfigured",
  } as const;

  return {
    ready: Object.values(checks).every((value) => value === "configured"),
    checks,
  };
}
