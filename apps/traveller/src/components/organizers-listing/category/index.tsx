import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import OrganizerCard from "../organizer-card";

interface Organizer {
  name: string;
  avatarUrl: string;
  noOfEvents: number;
  rating: string;
}

interface CategoryProps {
  title: string;
  organizers: Organizer[];
}

const Category: React.FC<CategoryProps> = ({ title, organizers }) => {
  const navigation = useNavigate();

  const toSnakeCase = (text: string): string => {
    return text.replace(/\s+/g, "_").toLowerCase();
  };

  const redirectToCategory = () => {
    navigation({
      to: "/organizers/$category",
      params: { category: toSnakeCase(title) },
    });
  };

  return (
    <section className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">{title}</h1>
        <Button variant="ghost" size="icon" onClick={redirectToCategory}>
          <ArrowRight />
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4  px-4 snap-x scrollbar-hidden">
        {organizers.map((organizer, index) => (
          <OrganizerCard key={index} {...organizer} />
        ))}
      </div>
    </section>
  );
};

export default Category;
