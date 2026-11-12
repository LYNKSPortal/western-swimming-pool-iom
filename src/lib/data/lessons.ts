export type LessonAudience =
  | "Expectant mums"
  | "Babies & parents"
  | "Pre-schoolers"
  | "Juniors"
  | "Advanced juniors"
  | "Children & teens"
  | "Teens & adults"
  | "All ages"
  | "Adults";

export type AgeGroupTag = "baby" | "preschool" | "junior" | "teen" | "adult";
export type GoalTag =
  | "learn-to-swim"
  | "confidence"
  | "technique"
  | "competitive"
  | "lifesaving"
  | "fitness"
  | "support-needs"
  | "relaxation";

export type LessonProgramme = {
  slug: string;
  name: string;
  shortName: string;
  audience: LessonAudience;
  ageRange: string;
  pool: "Leisure Pool" | "Main Pool" | "Leisure & Main Pool" | "Varies";
  summary: string;
  description: string[];
  schedule?: string;
  prerequisites?: string[];
  highlights: string[];
  image: string;
  imageAlt: string;
  order: number;
  cta?: { label: string; href: string };
  ageGroups: AgeGroupTag[];
  goals: GoalTag[];
  /**
   * Typical age range in months, used only to give parents gentle, non-binding
   * guidance when enquiring (e.g. on the lesson booking form). This is an
   * estimate for guidance only, official stage placement is always decided
   * by our teachers in person.
   */
  minAgeMonths?: number;
  maxAgeMonths?: number;
};

export const lessonProgrammes: LessonProgramme[] = [
  {
    slug: "aquanatal",
    name: "Aquanatal",
    shortName: "Aquanatal",
    audience: "Expectant mums",
    ageRange: "Expectant mums (any stage, subject to GP advice)",
    pool: "Main Pool",
    summary:
      "Relaxation, gentle fitness and fun with other mums-to-be, run by a trained midwife.",
    description: [
      "Our Aquanatal classes combine relaxation, fitness and fun with other mums-to-be, run by a trained midwife.",
      "Sessions take place every Thursday. To put your name down, call the NSC (National Sports Centre) on 688588.",
    ],
    schedule: "Every Thursday, call the NSC on 688588 to book",
    highlights: ["Led by a trained midwife", "Low-impact, water-supported exercise", "Friendly group of expectant mums"],
    image: "/images/two-pools-teacher.jpg",
    imageAlt: "Peel's small pool with the large pool in the background and a swimming teacher and swimmer",
    order: 1,
    ageGroups: ["adult"],
    goals: ["relaxation", "fitness"],
  },
  {
    slug: "adult-and-child",
    name: "Adult & Child",
    shortName: "Adult & Child",
    audience: "Babies & parents",
    ageRange: "From 4 months old",
    pool: "Leisure Pool",
    summary: "Get your little ones loving the water from four months old, led through play.",
    description: [
      "Get your little ones loving the water from four months old. Lessons are focused through play, with plenty of flexibility to make sure every child is engaged in a way that suits them.",
      "We also give you the confidence to support your child when you swim together as a family.",
    ],
    highlights: ["From 4 months old", "Play-based water confidence", "Builds parent confidence too"],
    image: "/images/leisure-pool.jpg",
    imageAlt: "Western swimming pool's little pool",
    order: 2,
    ageGroups: ["baby"],
    goals: ["confidence", "learn-to-swim"],
    minAgeMonths: 4,
    maxAgeMonths: 30,
  },
  {
    slug: "pre-school",
    name: "Pre-school swimming",
    shortName: "Pre-school",
    audience: "Pre-schoolers",
    ageRange: "From age 2, before starting school",
    pool: "Leisure Pool",
    summary: "Games and songs build water confidence ahead of school swimming lessons.",
    description: [
      "The journey continues with classes from two years before children start school. We use lots of games and songs to keep things fun and help build confidence in the water, gradually preparing children for school swimming lessons.",
      "These sessions have two teachers in the water at all times.",
    ],
    highlights: ["Two teachers in the water at all times", "Games & songs based learning", "Prepares children for school swimming"],
    image: "/images/teacher-overlook.jpg",
    imageAlt: "Swimming teacher overlooking the main pool at Peel",
    order: 3,
    ageGroups: ["preschool"],
    goals: ["confidence", "learn-to-swim"],
    minAgeMonths: 24,
    maxAgeMonths: 60,
  },
  {
    slug: "stages-1-3",
    name: "Junior Stages 1–3",
    shortName: "Stages 1–3",
    audience: "Juniors",
    ageRange: "School-age beginners",
    pool: "Leisure & Main Pool",
    summary: "Where junior swimming lessons begin, moving from the little pool into the main pool.",
    description: [
      "This is where junior swimming lessons begin. Stages 1 and 2 take place in the little pool, where we help children understand how to control their movements in the water.",
      "Stage 3 focuses on gaining confidence in the main pool and the beginnings of stroke technique.",
    ],
    highlights: ["Stages 1–2 in the Leisure Pool", "Stage 3 moves into the Main Pool", "Foundations of stroke technique"],
    image: "/images/pool-floats.jpg",
    imageAlt: "Pool floats at the side of the small swimming pool",
    order: 4,
    ageGroups: ["junior"],
    goals: ["learn-to-swim", "confidence", "technique"],
    minAgeMonths: 48,
    maxAgeMonths: 108,
  },
  {
    slug: "stages-4-6",
    name: "Stages 4–6",
    shortName: "Stages 4–6",
    audience: "Juniors",
    ageRange: "Progressing juniors",
    pool: "Main Pool",
    summary: "Building stamina and technique across all strokes, widthways across the pool.",
    description: [
      "These lessons take place across the width of the pool, helping build stamina and develop technique across all strokes.",
      "We begin with kicking techniques, then arm action, and build up to developing effective breathing and timing.",
    ],
    highlights: ["Technique across all four strokes", "Widthways lessons build stamina", "Breathing & timing development"],
    image: "/images/pool-ceiling.jpg",
    imageAlt: "Wide angle view of Peel's main swimming pool showing the vaulted wooden ceiling and lanes",
    order: 5,
    ageGroups: ["junior", "teen"],
    goals: ["technique", "confidence"],
    minAgeMonths: 60,
    maxAgeMonths: 156,
  },
  {
    slug: "stages-7-10",
    name: "Advanced Stages 7–10",
    shortName: "Stages 7–10",
    audience: "Advanced juniors",
    ageRange: "Advanced junior swimmers",
    pool: "Main Pool",
    summary: "Lane-length swimming, competitive technique and stamina up to 800m.",
    description: [
      "From here the lessons take place in lanes, so there's quite a jump in the distance required. In Stage 7 we focus on maintaining good technique, while Stage 8 marks the beginning of competitive swimming, delivered in conjunction with Peel Advanced Training Squad.",
      "In Stages 9 & 10 students develop the skills needed for competitive racing, increasing stamina up to 800m.",
    ],
    highlights: ["Lane-length distance swimming", "Linked to Peel Advanced Training Squad", "Builds stamina up to 800m"],
    image: "/images/hero-lane-dividers.jpg",
    imageAlt: "Wide angled view of the main pool with lane dividers",
    order: 6,
    ageGroups: ["teen"],
    goals: ["competitive", "technique"],
    minAgeMonths: 96,
    maxAgeMonths: 216,
  },
  {
    slug: "rookie-lifeguard",
    name: "Rookie Lifeguard",
    shortName: "Rookie Lifeguard",
    audience: "Children & teens",
    ageRange: "Over 8, able to swim two lengths and tread water for 2 minutes",
    pool: "Main Pool",
    summary: "Survival, rescue, teamwork and basic CPR, working towards bronze, silver and gold awards.",
    description: [
      "Rookie Lifeguard is an exciting alternative to competitive swimming, run by our Royal Life Saving Society trainers. Children learn survival, rescue, teamwork and basic CPR skills, working through bronze, silver and gold awards.",
      "Classes are every Monday from 5.30pm to 6.30pm. To take part, children must be over eight, able to swim two lengths and tread water for at least two minutes.",
    ],
    schedule: "Mondays, 5:30pm – 6:30pm",
    prerequisites: ["Aged 8 or over", "Able to swim two lengths", "Able to tread water for 2 minutes"],
    highlights: ["Run by RLSS-trained trainers", "Bronze, silver & gold awards", "Basic CPR & rescue skills"],
    image: "/images/lifeguard.jpg",
    imageAlt: "Lifeguard sitting high up overlooking the pools at Western Swimming Pool",
    order: 7,
    ageGroups: ["junior", "teen"],
    goals: ["lifesaving"],
    minAgeMonths: 96,
  },
  {
    slug: "survive-and-save",
    name: "Survive & Save",
    shortName: "Survive & Save",
    audience: "Teens & adults",
    ageRange: "From age 12",
    pool: "Main Pool",
    summary: "A stepping stone towards the RLSS Bronze Medallion, pool helper or lifeguard roles.",
    description: [
      "Children aged 12+ who want to take lifesaving further can work towards the RLSS Bronze Medallion with the Survive & Save programme.",
      "It's a great stepping stone to becoming a pool helper or even a lifeguard, get in touch to find out more.",
    ],
    prerequisites: ["Aged 12 or over"],
    highlights: ["Works towards RLSS Bronze Medallion", "Pathway to pool helper or lifeguard", "Builds on Rookie Lifeguard skills"],
    image: "/images/hero-wide-pool.jpg",
    imageAlt: "Wide angle of the main swimming pool",
    order: 8,
    cta: { label: "Get in touch", href: "/contact" },
    ageGroups: ["teen", "adult"],
    goals: ["lifesaving"],
    minAgeMonths: 144,
  },
  {
    slug: "private-lessons",
    name: "Private Lessons",
    shortName: "Private Lessons",
    audience: "All ages",
    ageRange: "All ages and abilities",
    pool: "Varies",
    summary: "One-to-one coaching matched to the right specialist teacher for faster progress.",
    description: [
      "There's no faster way for keen swimmers to progress than with one-to-one coaching. Different teachers have different specialities, we'll help match you up with the right one.",
      "Each half-hour lesson costs £28.00 for one child, with £5 for each additional child up to a total of three.",
    ],
    highlights: ["30-minute 1:1 sessions", "£28 for one child", "+£5 per extra child (up to 3)"],
    image: "/images/accessible-hoist.jpg",
    imageAlt: "Disabled hoist at the side of the main swimming pool",
    order: 9,
    ageGroups: ["baby", "preschool", "junior", "teen", "adult"],
    goals: ["technique", "confidence", "competitive"],
  },
  {
    slug: "special-needs-support",
    name: "Special Needs Support",
    shortName: "Special Needs",
    audience: "All ages",
    ageRange: "All ages and abilities",
    pool: "Varies",
    summary: "Skilled, tailored support for children with special needs, in groups or one-to-one.",
    description: [
      "All our teachers have the skills to support children with special needs in mainstream sessions, and some are also qualified to give one-to-one lessons.",
      "We can even modify the requirements of the National Plan to enable children with challenges to progress through it.",
    ],
    highlights: ["Mainstream & one-to-one options", "National Plan modified where needed", "Experienced, patient teachers"],
    image: "/images/accessible-changing.jpg",
    imageAlt: "Accessible changing room and shower facilities at Western Swimming Pool",
    order: 10,
    ageGroups: ["baby", "preschool", "junior", "teen", "adult"],
    goals: ["support-needs", "confidence"],
  },
  {
    slug: "adult-coaching",
    name: "Adult Coaching",
    shortName: "Adult Coaching",
    audience: "Adults",
    ageRange: "Adults, all abilities",
    pool: "Main Pool",
    summary: "From complete beginners to budding triathletes, matched to a specialist coach.",
    description: [
      "Whether you're a complete beginner or a budding triathlete, looking to improve specific skills or need rehab support, our friendly, expert coaches will help you achieve your goals.",
      "They all have different specialist skills, so have a chat with us and we'll match you up with the coach who's right for you.",
    ],
    highlights: ["Beginners to triathletes", "Technique & rehab support", "Matched to a specialist coach"],
    image: "/images/teacher-poolside.jpg",
    imageAlt: "Swimming teacher overlooking the main pool at Peel",
    order: 11,
    ageGroups: ["adult"],
    goals: ["learn-to-swim", "technique", "fitness", "competitive"],
    minAgeMonths: 192,
  },
];

export function getLessonBySlug(slug: string) {
  return lessonProgrammes.find((lesson) => lesson.slug === slug);
}

export const progressionPathway = [
  "Adult & Child (4 months+)",
  "Pre-school",
  "Stages 1–3",
  "Stages 4–6",
  "Stages 7–10",
  "Peel Swimming Club / Rookie Lifeguard / Survive & Save",
];
