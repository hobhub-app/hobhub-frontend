export const SKILL_LEVELS = [
  { level: "beginner", color: "yellow.100" },
  { level: "intermediate", color: "pink.100" },
  { level: "advanced", color: "green.200" },
  { level: "expert", color: "purple.300" },
] as const;

export type SkillLevel = (typeof SKILL_LEVELS)[number]["level"];
