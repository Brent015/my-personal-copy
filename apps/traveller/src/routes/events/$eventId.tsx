import { DotSeparator } from "@/components/common";
import { PackageSelector } from "@/components/events/package-selector";
import {
  DateOption,
  Package,
} from "@/components/events/package-selector/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

import { MapPin, Star, Users } from "lucide-react";
import { TouchEvent, useCallback, useEffect, useState } from "react";

export const Route = createFileRoute("/events/$eventId")({
  component: EventPage,
});

// Usage Example:
const sampleDates: DateOption[] = [
  { date: "2024-10-03", label: "3 Oct" },
  { date: "2024-10-04", label: "4 Oct" },
  { date: "2024-10-05", label: "5 Oct" },
];

const samplePackages: Package[] = [
  {
    id: 1,
    title: "Package Title",
    price: 1700,
    activities: ["Hiking", "Diving"],
  },
  {
    id: 2,
    title: "Package Title",
    price: 1800,
    activities: ["Hiking", "Diving"],
  },
  {
    id: 3,
    title: "Package Title",
    price: 1900,
    activities: ["Hiking", "Diving"],
  },
];

function EventPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const [selectedDate, setSelectedDate] = useState<string>(
    sampleDates[0]?.date || ""
  );
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(
    null
  );

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    // Additional logic here if needed
  };

  const handlePackageSelect = (packageId: number | null) => {
    setSelectedPackageId(packageId);
    // Additional logic here if needed
  };
  const images = Array(8).fill("https://loremflickr.com/320/240/beach,bohol");

  // Auto advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSwiping) {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isSwiping, images.length]);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSwiping) return;

    const currentTouch = e.touches[0].clientX;
    const diff = currentTouch - touchStart;

    // Calculate swipe offset as percentage
    const offset = (diff / window.innerWidth) * 100;
    setSwipeOffset(offset);
    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = useCallback(() => {
    setIsSwiping(false);
    setSwipeOffset(0);

    const swipeThreshold = 50; // minimum swipe distance in pixels
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentImage < images.length - 1) {
        // Swiped left
        setCurrentImage((prev) => prev + 1);
      } else if (diff < 0 && currentImage > 0) {
        // Swiped right
        setCurrentImage((prev) => prev - 1);
      }
    }
  }, [touchStart, touchEnd, currentImage, images.length]);

  const goToSlide = (index: number) => {
    setCurrentImage(index);
    setIsSwiping(false);
    setSwipeOffset(0);
  };

  const getTransform = () => {
    const baseTransform = currentImage * -100;
    return `translateX(${baseTransform + swipeOffset}%)`;
  };

  return (
    <div className="pb-[167px] h-screen flex flex-col overflow-x-hidden">
      {/* Image Carousel */}
      <div className="relative w-full h-64 bg-gray-100 touch-pan-y">
        <div
          className={`flex h-full ${isSwiping ? "" : "transition-transform duration-500 ease-out"}`}
          style={{ transform: getTransform() }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
              draggable="false"
            />
          ))}
        </div>
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm flex items-center">
          <MapPin className="h-4 w-4 mr-1 text-blue-500" />
          762 km away from Manila
        </div>
        <div className="absolute bottom-9 right-4 text-grayscale-100 bg-white text-sm px-2 py-1 rounded-sm">
          {currentImage + 1}/8
        </div>

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                index === currentImage ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-t-3xl relative -mt-6">
        {/* Rest of your component remains unchanged */}
        <div className="p-4 pt-6 space-y-2">
          <h1 className="text-2xl font-medium">Bohol</h1>

          <div className="flex gap-2">
            <div className="rounded-7xl py-1 px-2 text-main-black text-sm font-medium bg-grayscale-600">
              🏖️ Beach
            </div>
            <div className="px-3 py-1 bg-grayscale-600 rounded-full text-sm text-main-black">
              Hiking
            </div>
            <div className="px-3 py-1 bg-grayscale-600 rounded-full text-sm text-main-black">
              Diving
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Avatar className="w-5 h-5">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>{" "}
              <span className="text-sm">Organizer</span>
              <DotSeparator />
              <div className="flex items-center">
                <Star className="text-yellow-primary fill-current w-3 h-3" />
                <span className="text-sm ml-1">4.95</span>
              </div>
              <DotSeparator />
              <span className="text-sm text-gray-500">22 reviews</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1 text-[#27B9D7]" />
              100 attendees
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 mx-4" />
        <div className="px-4 py-3">
          <h2 className="text-xl font-semibold mb-2">Description Heading</h2>
          <p className="text-gray-600 text-sm">Description here</p>
        </div>

        <PackageSelector
          packages={samplePackages}
          dates={sampleDates}
          selectedDate={selectedDate}
          selectedPackageId={selectedPackageId}
          onDateChange={handleDateChange}
          onPackageSelect={handlePackageSelect}
        />

        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Reviews</h2>
            <button className="text-blue-400 text-sm">→</button>
          </div>
          <div className="flex gap-2 overflow-x-auto snap-x scrollbar-hidden">
            {[1, 2, 3].map((index) => (
              <div key={index} className="border min-w-[180px] p-3 rounded-lg ">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/api/placeholder/40/40" />
                    <AvatarFallback>T</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">Traveler</div>
                    <div className="text-xs text-gray-500">Date</div>
                  </div>
                </div>
                <div className="flex items-center mb-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm ml-1">4.95</span>
                </div>
                <p className="text-sm text-gray-600">Review description</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed z-20 bottom-[65px] left-0 right-0 border-t border-t-yellow-primary bg-[#fefbf2] p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">₱ 1,700</div>
            <div className="text-xs text-gray-500">per night</div>
            <button className="text-blue-400 text-sm">More details →</button>
          </div>
          <Link to="/checkout">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
              Book now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
