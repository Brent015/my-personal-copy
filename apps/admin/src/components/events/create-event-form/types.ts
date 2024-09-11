import { z } from "zod";

export const eventSchema = z.object({
  // Event Details
  eventName: z.string().min(1, "Event name is required"),
  eventImages: z.array(z.any()).min(1, "At least one image is required"),
  eventHighlights: z.string().min(1, "Event highlights are required"),
  eventLocation: z.string().min(1, "Event location is required"),
  distance: z.number().min(0, "Distance must be a positive number"),

  // Packages
  packages: z
    .array(
      z.object({
        title: z.string().min(1, "Package title is required"),
        description: z.string().min(1, "Package description is required"),
        duration: z.number().min(1, "Duration must be at least 1 day"),
        price: z.number().min(0, "Price must be a positive number"),
        activities: z
          .array(z.string())
          .min(1, "At least one activity is required"),
        inclusions: z.string().min(1, "Inclusions are required"),
        itinerary: z.string().min(1, "Itinerary is required"),
        exclusions: z.string().min(1, "Exclusions are required"),
        notes: z.string().optional(),
      })
    )
    .min(1, "At least one package is required"),

  // Payment and Discounts
  requiredDownPayment: z
    .number()
    .min(0, "Down payment must be a positive number"),
  allowFullPayment: z.boolean(),
  discounts: z.array(
    z.object({
      name: z.string().min(1, "Discount name is required"),
      type: z.enum(["percentage", "amount"]),
      value: z.number().min(0, "Discount value must be a positive number"),
      validity: z.date().optional(),
    })
  ),
});

export type EventFormData = z.infer<typeof eventSchema>;

// type EventFormData = z.infer<typeof eventSchema>;

export const sampleEventData: EventFormData = {
  // Event Details
  eventName: "Bali Adventure Retreat",
  eventImages: [
    "https://loremflickr.com/320/320/philippines,zambales",
    "https://loremflickr.com/320/320/philippines,boracay",
    "https://loremflickr.com/320/320/philippines,beach"
  ],
  eventHighlights:
    "Experience the beauty of Bali with our 7-day adventure retreat. Explore pristine beaches, ancient temples, lush rice terraces, and immerse yourself in the rich Balinese culture.",
  eventLocation: "Bali, Indonesia",
  distance: 150, // km from Denpasar airport

  // Packages
  packages: [
    {
      title: "Standard Package",
      description:
        "Our popular 7-day Bali experience covering all the must-see locations",
      duration: 7,
      price: 1299,
      activities: [
        "Ubud Monkey Forest tour",
        "Tegalalang Rice Terrace visit",
        "Uluwatu Temple sunset trip",
        "Nusa Penida island day tour",
        "Traditional Balinese cooking class",
        "Yoga and meditation session",
      ],
      inclusions:
        "Accommodation (6 nights), Daily breakfast, 3 lunches, 2 dinners, All mentioned activities, Airport transfers, English-speaking guide",
      itinerary: `
Day 1: Arrival and welcome dinner
Day 2: Ubud tour - Monkey Forest, art markets
Day 3: Tegalalang Rice Terrace, coffee plantation visit
Day 4: Nusa Penida island day trip
Day 5: Cooking class and free afternoon
Day 6: Uluwatu Temple, Kecak fire dance, farewell dinner
Day 7: Yoga session, departure
      `,
      exclusions:
        "Flights, Travel insurance, Personal expenses, Optional activities",
      notes:
        "Please inform us of any dietary restrictions or special requirements",
    },
    {
      title: "Deluxe Package",
      description:
        "An enhanced 7-day experience with premium accommodations and additional activities",
      duration: 7,
      price: 1799,
      activities: [
        "All Standard Package activities",
        "Spa treatment",
        "Mount Batur sunrise trek",
        "Private beach day at Nusa Dua",
        "Traditional Balinese dance performance",
      ],
      inclusions:
        "Luxury accommodation (6 nights), All meals included, Premium activity options, Private airport transfers, Personal concierge",
      itinerary: `
Day 1: VIP arrival and gourmet welcome dinner
Day 2: Ubud tour - Monkey Forest, art markets, spa treatment
Day 3: Mount Batur sunrise trek, hot springs visit
Day 4: Nusa Penida island private tour
Day 5: Cooking class and Balinese dance performance
Day 6: Uluwatu Temple, private beach day at Nusa Dua
Day 7: Yoga session, departure
      `,
      exclusions: "Flights, Travel insurance, Personal expenses",
      notes:
        "Deluxe package includes personalized itinerary adjustments upon request",
    },
  ],

  // Payment and Discounts
  requiredDownPayment: 300,
  allowFullPayment: true,
  discounts: [
    {
      name: "Early Bird Special",
      type: "percentage",
      value: 10,
      validity: new Date("2024-12-31"),
    },
    {
      name: "Group Discount",
      type: "amount",
      value: 100,
    },
  ],
};
