import { SKILL_LEVELS } from "@/constants/skillLevels";

export const getSkillLevelColor = (skillLevel?: string): string | undefined => {
  return SKILL_LEVELS.find(({ level }) => level === skillLevel)?.color;
};
