import { describe, expect, it } from "vitest";
import { landingChapters } from "./navigation";
import { projects } from "./projects";
import { securityCards, securityCertifications } from "./security";
import { skillGroups } from "./skills";

describe("landing data", () => {
  it("keeps the expected landing content groups", () => {
    expect(landingChapters).toHaveLength(7);
    expect(skillGroups).toHaveLength(4);
    expect(projects).toHaveLength(5);
    expect(securityCards).toHaveLength(12);
    expect(securityCertifications).toHaveLength(18);
  });
});
