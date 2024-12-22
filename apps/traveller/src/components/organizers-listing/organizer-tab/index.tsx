import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mountain,
  TreePine,
  Landmark,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import ReviewCard, { ReviewCardProps as Review } from "../review-card";
import { Button } from "@/components/ui/button";
import Destination from "../destination";
import EventCard from "../event-card";

const activities = [
  { id: "trekking", name: "🏖️ Trekking" },
  { id: "diving", name: "🏖️ Diving" },
  { id: "photography", name: "🏖️ Photography" },
  { id: "camping", name: "🏖️ Camping" },
  { id: "videography", name: "🏖️ Videography" },
];

const OrganizerTab = () => {
  const [expandReviews, setExpandReviews] = useState(false);

  const tabs = [
    { value: "events", label: "Events" },
    { value: "overview", label: "Overview" },
  ];

  const eventCategories = [
    { icon: Mountain, name: "Beach", eventCount: 3 },
    { icon: Mountain, name: "Hiking", eventCount: 5 },
    { icon: Landmark, name: "Historical", eventCount: 2 },
    { icon: TreePine, name: "Nature", eventCount: 4 },
  ];

  const reviews: Review[] = [
    {
      avatar: "https://loremflickr.com/320/240/beach,bohol",
      name: "John Doe",
      rating: 4.95,
      date: "01/01/2025",
      description: "Amazing experience with the team! Highly recommended.",
    },
    {
      avatar: "https://loremflickr.com/320/240/beach,bohol",
      name: "Jane Smith",
      rating: 4.95,
      date: "01/01/2025",
      description: "Fantastic organization and great events!",
    },
    {
      avatar: "https://loremflickr.com/320/240/beach,bohol",
      name: "Red John",
      rating: 4.69,
      date: "01/01/2025",
      description: "Fantastic organization and great events!",
    },
  ];

  const faqs = [
    {
      question: "How do I register for an event?",
      answer: "You can register directly through our website or mobile app.",
    },
    {
      question: "Are events refundable?",
      answer:
        "Most events have a flexible cancellation policy up to 7 days before the event.",
    },
  ];

  return (
    <Tabs defaultValue="events" className="w-full h-full">
      <TabsList className="w-full h-auto bg-white flex justify-start gap-x-2 mb-4 px-4 pb-4 border-b border-outline-primary">
        {tabs.map((tab, idx) => (
          <TabsTrigger
            key={idx}
            value={tab.value}
            className={cn(
              "relative py-1 px-2 text-xl font-medium transition-colors duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded",
              "text-grayscale-400 hover:text-gray-600",
              "data-[state=active]:text-yellow-primary data-[state=active]:bg-[#FBC50A1A] data-[state=active]:shadow-none"
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="events" className="px-4 py-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          {eventCategories.map((category, index) => (
            <EventCard
              key={index}
              icon={category.icon}
              name={category.name}
              eventCount={category.eventCount}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="overview" className="px-4 py-6 space-y-4">
        {/* Activities Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Activities</h2>
          <div className="flex flex-wrap gap-1">
            {activities.map((activity) => (
              <Badge
                key={activity.id}
                variant="secondary"
                className="bg-teal-primary/10 p-2 text-center rounded-7xl"
              >
                <span className="text-badge-lightblue">{activity.name}</span>
              </Badge>
            ))}
          </div>
        </section>

        {/* Coordinator Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Coordinators</h2>
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src="/coordinator1.jpg" />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="/coordinator2.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </section>

        {/* Destination Section */}
        <Destination />

        {/* Reviews Section */}
        <section>
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold">Reviews</h2>
            <Button variant="ghost" size="icon">
              <ArrowRight />
            </Button>
          </div>

          <div className="flex flex-wrap justify-between gap-2">
            {reviews
              .slice(0, expandReviews ? reviews.length : 2)
              .map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
          </div>

          <Button
            variant="outline"
            onClick={() => setExpandReviews(!expandReviews)}
            className="w-full flex items-center text-primary text-lg px-6 py-3 h-fit"
          >
            {expandReviews ? (
              <>
                Hide Reviews <ChevronUp size={16} className="ml-2" />
              </>
            ) : (
              <>
                See All Reviews <ChevronDown size={16} className="ml-2" />
              </>
            )}
          </Button>
        </section>

        {/* FAQs Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <Card key={index} className="mb-2">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </TabsContent>
    </Tabs>
  );
};

export default OrganizerTab;
