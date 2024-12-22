import { ImageGallery } from '@/components/events'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/gallery')({
  component: ImageGallery,
})
