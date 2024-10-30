import { Flash, PinAlt, SystemRestart } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { CategoryFilter } from "../types";
import { Link, useSearch } from "@tanstack/react-router";
import { ReactNode } from "react";

const categories: {
  category: (typeof CategoryFilter)[keyof typeof CategoryFilter];
  icon: ReactNode;
}[] = [
  {
    category: CategoryFilter.POPULAR,
    icon: <SystemRestart />,
  },
  {
    category: CategoryFilter.NEARBY,
    icon: <PinAlt />,
  },
  {
    category: CategoryFilter.UPCOMING,
    icon: <Flash />,
  },
];

const Categories = () => {
  const { category } = useSearch({ from: "/home/_home/listing" });
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hidden">
      {categories.map((cat) => (
        <Link to="/home/listing" search={{ category: cat.category }}>
          <Button
            key={cat.category}
            variant={category === cat.category ? "default" : "outline"}
            className="rounded-full border-outline-primary text-base capitalize"
          >
            {cat.icon}
            {cat.category}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
