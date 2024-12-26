import { GuestType } from "./types";

export const defaultGuests: GuestType[] = [
  {
    id: "adults",
    title: "Adults",
    description: "Ages 13 or above",
    count: 1,
  },
  {
    id: "children",
    title: "Children",
    description: "Ages 2-12",
    count: 0,
  },
  {
    id: "infants",
    title: "Infants",
    description: "Under 2",
    count: 0,
  },
];
