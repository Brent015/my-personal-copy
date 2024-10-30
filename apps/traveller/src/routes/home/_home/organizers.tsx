import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home/_home/organizers')({
  component: () => <div>Hello /_home/organizers!</div>,
})
