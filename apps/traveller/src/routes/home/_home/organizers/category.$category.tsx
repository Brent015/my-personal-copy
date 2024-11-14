import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute(
  '/home/_home/organizers/category/$category',
)({
  component: () => <OrganizerCategory />,
})

const OrganizerCategory = () => {
  const { category } = Route.useParams();

  return <div>{category}</div>
}

export default OrganizerCategory
