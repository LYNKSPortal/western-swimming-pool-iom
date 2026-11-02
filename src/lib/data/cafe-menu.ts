export type MenuItem = {
  name: string;
  price: number;
  note?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  intro?: string;
  items: MenuItem[];
};

export const cafeMenu: MenuCategory[] = [
  {
    id: "lite-bites",
    label: "Lite Bites",
    items: [
      { name: "Sausage bap", price: 4.2 },
      { name: "Bacon bap", price: 4.4 },
      { name: "Sausage/bacon bap", price: 4.9 },
      { name: "Bacon/egg bap", price: 4.9 },
      { name: "Sausage/egg bap", price: 4.6 },
      { name: "Sausage, bacon and egg", price: 5.6 },
      { name: "Scrambled egg on toast", price: 4.6 },
      { name: "Poached egg on toast", price: 4.6 },
      { name: "Beans on toast", price: 4.6 },
      { name: "Cheese on toast", price: 3.0 },
    ],
  },
  {
    id: "jacket-potatoes",
    label: "Jacket Potatoes",
    intro: "Served with salad",
    items: [
      { name: "Beans", price: 8.9 },
      { name: "Cheese", price: 9.05 },
      { name: "Tuna", price: 9.4 },
      { name: "Cheese and tuna", price: 10.4 },
      { name: "Cheese and beans", price: 9.9 },
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches",
    intro: "Toasted sandwiches +£0.40",
    items: [
      { name: "Ham", price: 6.0 },
      { name: "Cheese", price: 6.3 },
      { name: "Tuna", price: 6.5 },
      { name: "Cheese and ham", price: 7.2 },
      { name: "Cheese and tuna", price: 7.6 },
    ],
  },
  {
    id: "kids-meals",
    label: "Kids' Meals",
    items: [
      { name: "Sandwich: ham, cheese or tuna", price: 5.9 },
      { name: "Beans on toast", price: 5.9 },
      { name: "Egg on toast", price: 5.9 },
      { name: "Sausage, chips and beans", price: 6.9 },
      { name: "Teacakes", price: 2.3 },
      { name: "Toast (2 rounds)", price: 2.2 },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    intro: "All coffee also available iced",
    items: [
      { name: "Tea", price: 1.75 },
      { name: "Fruit teas", price: 2.9 },
      { name: "Americano", price: 3.5 },
      { name: "Cappuccino", price: 3.7 },
      { name: "Latte", price: 3.7 },
      { name: "Mocha", price: 3.8 },
      { name: "Flat white", price: 3.7 },
      { name: "Espresso", price: 2.7 },
      { name: "Double espresso", price: 3.2 },
      { name: "Hot chocolate", price: 3.7 },
      { name: "Cream or marshmallows", price: 0.75 },
      { name: "Syrup", price: 0.5 },
      { name: "Coke", price: 1.95 },
      { name: "Other cans", price: 1.65 },
      { name: "Capri-Sun / Fruit Shoot", price: 1.75 },
      { name: "Kulana carton", price: 1.6 },
      { name: "Milkshakes", price: 1.6 },
      { name: "Radnor carton", price: 1.6 },
      { name: "Water", price: 1.45 },
      { name: "Sparkling water", price: 1.45 },
      { name: "Flavoured water", price: 1.95 },
    ],
  },
];
