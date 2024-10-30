export interface Event {
  id: string;
  title: string;
  address: string;
  image: string;
  price: number;
  rating?: number;
  organizer: string;
  bookings: number;
  isNew?: boolean;
  category: string;
}
