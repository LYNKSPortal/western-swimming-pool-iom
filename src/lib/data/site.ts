export const siteConfig = {
  name: "Western Swimming Pool",
  tagline: "Fun and fitness at the heart of the community",
  headline: "Your pool. Your community. Your next adventure.",
  description:
    "Western Swimming Pool in Peel, Isle of Man offers public swimming, swimming lessons, Aquafit, Silver Club, Peel Swimming Club, Café West and a playground for the whole community.",
  url: "https://www.westernswimmingpool.im",
  address: {
    line1: "Derby Road",
    town: "Peel",
    region: "Isle of Man",
    postcode: "IM5 1SW",
    country: "Isle of Man",
  },
  phone: "01624 842525",
  phoneHref: "tel:01624842525",
  email: "reception@westernswimmingpool.im",
  nscPhone: "688588",
  socials: {
    facebook: "https://www.facebook.com/westernswimmingpool",
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavLink[] = [
  { label: "Timetable", href: "/timetable" },
  { label: "Swimming lessons", href: "/swimming-lessons" },
  { label: "Other activities", href: "/other-activities" },
  { label: "Admission prices", href: "/admission-prices" },
  { label: "Café West", href: "/cafe-and-playground" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Timetable", href: "/timetable" },
      { label: "Swimming lessons", href: "/swimming-lessons" },
      { label: "Other activities", href: "/other-activities" },
      { label: "Admission prices", href: "/admission-prices" },
      { label: "Café West", href: "/cafe-and-playground" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About us", href: "/about" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Contact", href: "/contact" },
      { label: "Book swimming lessons", href: "/swimming-lessons/register" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms & conditions", href: "/terms-conditions" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Cookie policy", href: "/cookie-policy" },
    ],
  },
];

export const quickLinks: (NavLink & { description: string })[] = [
  {
    label: "Swimming timetable",
    href: "/timetable",
    description: "Public swim sessions across the Main and Leisure pools, every day of the week.",
  },
  {
    label: "Admission prices",
    href: "/admission-prices",
    description: "Pay-as-you-go pricing, family tickets and great value annual passes.",
  },
  {
    label: "Swimming lessons",
    href: "/swimming-lessons",
    description: "From four months old to advanced stages, lifesaving and adult coaching.",
  },
  {
    label: "Café West",
    href: "/cafe-and-playground",
    description: "All-day breakfasts, hot drinks, cake and a brilliant outdoor playground.",
  },
];
