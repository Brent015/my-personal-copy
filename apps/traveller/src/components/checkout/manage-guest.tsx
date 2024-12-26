import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { GuestCounter } from "../search";
import { defaultGuests } from "../search/guest-counter/defaultGuests";
import { GuestType } from "../search/guest-counter/types";
import { Button } from "../ui/button";

const ManageGuest = () => {
  const [open, toggle] = useState(false);
  const [guests, setGuests] = useState<GuestType[]>(defaultGuests);

  const toggleDrawer = () => toggle((prev) => !prev);

  const handleGuestsChange = (newGuests: GuestType[]) => {
    setGuests(newGuests);
    // Additional logic here if needed
  };
  return (
    <Drawer open={open} onClose={toggleDrawer}>
      <DrawerTrigger onClick={toggleDrawer} role="link">
        <Button variant="ghost" size="sm" className="h-8 px-2 ">
          <Edit2 className="h-4 w-4 text-yellow-primary" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <h1 className="text-xl font-medium p-4">Manage Guests</h1>
        <div className="px-4 pb-4">
          <GuestCounter
            guests={guests}
            onChange={handleGuestsChange}
            minValue={0}
            maxValue={10}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ManageGuest;
