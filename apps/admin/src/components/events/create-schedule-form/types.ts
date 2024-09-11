import { z } from "zod";

export const scheduleSchema = z.object({
  eventId: z.string(),
  schedule: z.tuple([z.date(), z.date()]),
  maxGuests: z.number().min(1),
  price: z.number().min(0),
});

export type ScheduleFormData = z.infer<typeof scheduleSchema>;
