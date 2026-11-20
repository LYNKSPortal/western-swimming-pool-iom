export type LessonEnquiryInput = {
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  programmeSlug: string;
  programmeName: string;
  availability: string;
  message: string;
};

export type LessonEnquiryRecord = LessonEnquiryInput & {
  id: string;
  createdAt: string;
  status: "new" | "contacted" | "booked" | "archived";
};
