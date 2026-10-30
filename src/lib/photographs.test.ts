import assert from "node:assert/strict";
import test from "node:test";
import { samePhotograph } from "./photographs.ts";

test("banner files that repeat a content photograph compare equal", () => {
  assert.equal(
    samePhotograph(
      "/images/v2/banner-render.webp",
      "/images/v2/service-render-application.webp",
    ),
    true,
  );
  assert.equal(
    samePhotograph(
      "/images/v2/banner-projects.webp",
      "/images/v2/project-dark-feature-cladding.webp",
    ),
    true,
  );
  assert.equal(
    samePhotograph(
      "/images/v2/banner-legal.webp",
      "/images/v2/cta-render-action.webp",
    ),
    true,
  );
});

test("distinct photographs do not compare equal", () => {
  assert.equal(
    samePhotograph(
      "/images/v2/banner-render.webp",
      "/images/v2/banner-cladding.webp",
    ),
    false,
  );
  assert.equal(
    samePhotograph(
      "/images/v2/home-hero-cladding-render.webp",
      "/images/v2/project-dark-feature-cladding.webp",
    ),
    false,
  );
});
