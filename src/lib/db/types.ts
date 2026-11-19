export type LessonEnquiryChild = {
  name: string;
  dob: string;
  skillLevel: string;
  approxAgeMonths: number | null;
};

export type LessonEnquiryInput = {
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  programmeSlug: string;
  programmeName: string;
  availability: string;
  message: string;
  isPrivateLesson: boolean;
  estimatedPriceGbp: number | null;
  eligibilityConfirmed: boolean | null;
  children: LessonEnquiryChild[];
};

export type LessonEnquiryRecord = LessonEnquiryInput & {
  id: string;
  createdAt: string;
  status: "new" | "contacted" | "booked" | "archived";
};
