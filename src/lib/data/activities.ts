export type OtherActivity = {
  slug: string;
  name: string;
  summary: string;
  description: string[];
  schedule?: string;
  prerequisites?: string[];
  instructors?: string[];
  image: string;
  imageAlt: string;
};

export const otherActivities: OtherActivity[] = [
  {
    slug: "aquafit",
    name: "Aquafit",
    summary: "Low-impact, water-based fitness classes for every level.",
    description: [
      "We have a range of aerobics-style classes in the pool, from challenging deep water classes to less demanding sessions in the shallow end.",
      "Aquafit is a great low-impact way to exercise, and especially helpful for all kinds of physical rehab.",
    ],
    image: "/images/pool-ceiling.jpg",
    imageAlt: "Wide angle view of Peel's main swimming pool",
  },
  {
    slug: "silver-club",
    name: "Silver Club",
    summary: "Gentle, supportive exercise in the water for older adults.",
    description: [
      "These sessions for older adults feature a more gentle range of exercises to support mobility, cardiovascular health and general fitness, all supported by the water.",
      "Classes are run by our highly experienced instructors Heather, Allison, Fay and Katie, who build in plenty of modifications so the exercises work for everyone.",
    ],
    instructors: ["Heather", "Allison", "Fay", "Katie"],
    image: "/images/two-pools-teacher.jpg",
    imageAlt: "Peel's small pool with the large pool in the background",
  },
  {
    slug: "peel-swimming-club",
    name: "Peel Swimming Club",
    summary: "The first step towards competitive swimming, on the pathway to the IOM Swimming Association.",
    description: [
      "Our acclaimed club is the first step towards competitive swimming on the pathway to the Isle of Man Swimming Association.",
      "Run by Breesha and Brian, club sessions take place on Wednesdays from 4:30pm to 6:30pm. Swimmers need to be aged 8+, able to swim two lengths, and at Stage 6 or above.",
    ],
    schedule: "Wednesdays, 4:30pm – 6:30pm",
    prerequisites: ["Aged 8 or over", "Able to swim two lengths", "Stage 6 or above"],
    instructors: ["Breesha", "Brian"],
    image: "/images/hero-lane-dividers.jpg",
    imageAlt: "Wide angled view of the main pool with lane dividers",
  },
  {
    slug: "indoor-kayaking",
    name: "Indoor Kayaking",
    summary: "A unique way to build water confidence and paddling skills indoors.",
    description: [
      "Indoor kayaking sessions give paddlers of all ages the chance to build confidence and core kayaking skills in the safety of the pool, supported by experienced instructors.",
    ],
    image: "/images/kayaking-2.jpg",
    imageAlt: "A kayaking training session taking place with the coach helping a child get into a kayak",
  },
  {
    slug: "synchronised-swimming",
    name: "Synchronised Swimming",
    summary: "Artistic swimming sessions combining technique, timing and teamwork.",
    description: [
      "Synchronised (artistic) swimming sessions combine stroke technique, timing and teamwork in the water — ask the team for current availability.",
    ],
    image: "/images/pool-floats.jpg",
    imageAlt: "Pink pool noodles at the side of the small swimming pool",
  },
];
