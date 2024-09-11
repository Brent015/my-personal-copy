// types.ts
export interface Coordinator {
  id: string;
  name: string;
}

export interface Vehicle {
  id: string;
  name: string;
}

export interface Schedule {
  id: string;
  startDate: string;
  endDate: string;
  maxGuests: number;
  bookedGuests: number;
  price: number;
  coordinator: Coordinator;
  vehicle: Vehicle;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  paidAmount: number;
  toCollectAmount: number;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  image: string;
}

// sampleData.ts

export const sampleEvent: Event = {
  id: "1",
  name: "Boracay Island Adventure",
  description:
    "Experience the beauty of Boracay with our exciting island adventure package!",
  image: "https://example.com/boracay-image.jpg",
};

export const sampleSchedules: Schedule[] = [
  {
    id: "1",
    startDate: "2023-09-15T08:00:00Z",
    endDate: "2023-09-18T17:00:00Z",
    maxGuests: 30,
    bookedGuests: 25,
    price: 1500,
    coordinator: {
      id: "101",
      name: "John Doe",
    },
    vehicle: {
      id: "201",
      name: "Van - Toyota HiAce",
    },
    status: "upcoming",
    paidAmount: 28750,
    toCollectAmount: 8750,
  },
  {
    id: "2",
    startDate: "2023-09-20T09:00:00Z",
    endDate: "2023-09-23T16:00:00Z",
    maxGuests: 25,
    bookedGuests: 20,
    price: 1600,
    coordinator: {
      id: "102",
      name: "Jane Smith",
    },
    vehicle: {
      id: "202",
      name: "Bus - Hyundai County",
    },
    status: "upcoming",
    paidAmount: 24000,
    toCollectAmount: 8000,
  },
  // ... (other schedules remain the same)
];
