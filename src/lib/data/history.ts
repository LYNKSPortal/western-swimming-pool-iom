export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

export const historyTimeline: TimelineEntry[] = [
  {
    year: "1896",
    title: "Traie Fogog seawater pool opens",
    description:
      "Peel's first swimming pool was the open-air seawater pool at Traie Fogog beach, which opened in 1896.",
    image: "/images/history-traie-fogog.jpg",
    imageAlt: "Sepia photo of the old Traie Fogog seawater swimming pool in Peel",
  },
  {
    year: "1920s",
    title: "The pool's heyday",
    description:
      "A bathing platform, changing rooms, toilet facilities and café were added — the heyday of the pool, packed all summer long with locals and tourists alike.",
  },
  {
    year: "1950s",
    title: "Traie Fogog closes",
    description:
      "After a series of landfalls, Traie Fogog pool closed in the 1950s.",
  },
  {
    year: "1950s–1970s",
    title: "Marine Parade pool",
    description:
      "Replacing Traie Fogog was another seawater pool at Marine Parade, which welcomed swimmers until it too closed in the early 1970s.",
  },
  {
    year: "2003",
    title: "Western Swimming Pool opens",
    description:
      "Peel was then pool-less until 9 October 2003, when the Western Swimming Pool opened its doors as the biggest and best recreation facility in the west.",
    image: "/images/hero-main-pool.jpg",
    imageAlt: "Wide angled view of the Main pool at Western Swimming Pool",
  },
];
