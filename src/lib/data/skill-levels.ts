export type SkillLevel =
  | "new-to-water"
  | "support-needed"
  | "developing"
  | "confident"
  | "not-sure";

export const skillLevelOptions: { value: SkillLevel; label: string }[] = [
  { value: "not-sure", label: "Not sure / let the teacher assess" },
  { value: "new-to-water", label: "New to the water, not yet swimming" },
  { value: "support-needed", label: "Can swim a little with floats/support" },
  { value: "developing", label: "Confident but still developing technique" },
  { value: "confident", label: "Confident, swims unaided" },
];
