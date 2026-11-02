export type AdmissionPrice = {
  label: string;
  price: number;
  note?: string;
};

export const admissionPrices: AdmissionPrice[] = [
  { label: "Adult", price: 5.0 },
  { label: "Senior (60+)", price: 4.0 },
  { label: "Child (5–16)", price: 4.0 },
  { label: "Parent & Toddler", price: 5.0, note: "One adult and one toddler" },
  { label: "Disabled Swimmer & Carer", price: 4.0, note: "Carer swims free alongside" },
];

export type TicketOption = {
  label: string;
  price: number;
  description: string;
  featured?: boolean;
};

export const ticketOptions: TicketOption[] = [
  {
    label: "Family Ticket",
    price: 15.5,
    description: "Great value admission for 2 adults and up to 3 children.",
  },
  {
    label: "10 Swim Saver — Adult",
    price: 45.0,
    description: "Ten adult admissions, use them whenever suits you.",
  },
  {
    label: "10 Swim Saver — Senior / Child",
    price: 35.0,
    description: "Ten senior or child admissions at a discounted rate.",
  },
  {
    label: "365-Day Annual Ticket",
    price: 300.0,
    description: "Unlimited public swimming for a full year from the day you start.",
    featured: true,
  },
];
