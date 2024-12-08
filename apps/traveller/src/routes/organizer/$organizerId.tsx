import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/organizer/$organizerId')({
  component: OrganizerProfile,
});

function OrganizerProfile() {
  const { organizerId } = Route.useParams() as { organizerId: string };
  return `Hello Organizer ${organizerId}`;
}
