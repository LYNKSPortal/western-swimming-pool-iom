export type SuccessStory = {
  slug: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  summary: string;
  story: string[];
};

export const successStories: SuccessStory[] = [
  {
    slug: "anna",
    name: "Anna",
    role: "Senior Lifeguard & Level 2 Swimming Teacher",
    image: "/images/story-anna.jpg",
    imageAlt: "Anna, who learned to swim at Western Swimming Pool and now teaches here",
    summary: "From pre-school lessons to teaching the next generation of swimmers.",
    story: [
      "Anna's journey began as a pre-schooler, in our group pre-school classes. She then progressed through our junior lessons before joining Douglas Swimming Club and the IOM Swim Squad, where she became a very competent swimmer and regularly competed at galas both on and off the island.",
      "Today Anna is back where her swimming journey began, working as a Senior Lifeguard and a Level 2 Swimming Teacher — teaching our pre-school lessons herself.",
    ],
  },
  {
    slug: "will",
    name: "Will",
    role: "Lifeguard, Level 2 Swimming Teacher & Level 1 Swimming Coach",
    image: "/images/story-will.jpg",
    imageAlt: "Will, who learned to swim at Western Swimming Pool and now teaches and coaches here",
    summary: "From age 5 to Level 1 coach — a lifetime in the pool that started with lessons.",
    story: [
      "Will remembers learning to swim here from the age of 5. He worked his way up through lessons to competitive swimming with Peel Swimming Club.",
      "Will trained as a lifeguard and now works a regular shift every Sunday and evenings throughout the week. He is also a Level 2 Swimming Teacher and a Level 1 Swimming Coach, regularly teaching higher stage classes each week and coaching IOM Swim Squad sessions.",
    ],
  },
];
