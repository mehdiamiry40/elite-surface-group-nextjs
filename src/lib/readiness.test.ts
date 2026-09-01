import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { serviceReadiness } from "./readiness.ts";

describe("serviceReadiness", () => {
  it("is ready only when delivery and monitoring configuration are present", () => {
    assert.deepEqual(
      serviceReadiness({
        contactDelivery: true,
        durableOutbox: true,
        deliveryEvents: true,
        syntheticMonitor: true,
      }),
      {
      ready: true,
      checks: {
        contactDelivery: "configured",
        durableOutbox: "configured",
        deliveryEvents: "configured",
        syntheticMonitor: "configured",
      },
      },
    );
  });

  it("degrades without exposing which secret value is missing", () => {
    const readiness = serviceReadiness({
      contactDelivery: true,
      durableOutbox: true,
      deliveryEvents: false,
      syntheticMonitor: true,
    });
    assert.equal(readiness.ready, false);
    assert.equal(readiness.checks.deliveryEvents, "unconfigured");
    assert.deepEqual(Object.keys(readiness.checks).sort(), [
      "contactDelivery",
      "deliveryEvents",
      "durableOutbox",
      "syntheticMonitor",
    ]);
  });
});
