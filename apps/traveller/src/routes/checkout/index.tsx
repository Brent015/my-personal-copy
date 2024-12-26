import { createFileRoute } from "@tanstack/react-router";

import ManageGuest from "@/components/checkout/manage-guest";
import SelectDates from "@/components/checkout/select-dates";
import SelectPackage from "@/components/checkout/select-package";
import { DotSeparator, SelectableCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Star, Users } from "lucide-react";
import { useState } from "react";
import travelCoin from "@/assets/images/travelcoins.png";

export const Route = createFileRoute("/checkout/")({
  component: TravelPayment,
});

export default function TravelPayment() {
  const [paymentMethod, setPaymentMethod] = useState("Credit/Debit Card");
  const [paymentType, setPaymentType] = useState("Full Payment");
  return (
    <div className="max-w-md mx-auto bg-white pb-[300px] divide-y px-4">
      {/* Banner */}

      {/* Tags and Organizer */}
      <div className="pb-4 space-y-2">
        <div className="relative pt-4 overflow-hidden bg-white">
          <img
            src="https://loremflickr.com/200/400/bohol,philippines"
            alt="Bohol beach"
            className="rounded-lg object-cover w-full h-[100px]"
          />
        </div>
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
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-full"
              />
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

      {/* Trip Summary */}
      <div className="py-4 space-y-4">
        <h2 className="text-xl font-semibold">Trip Summary</h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium text-lg">Package Title</div>
              <div className="text-grayscale-300 font-medium">Sub-info</div>
            </div>
            <SelectPackage />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Dates</div>
              <div className="text-grayscale-300 font-medium">
                No dates selected
              </div>
            </div>
            <SelectDates />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Buddies</div>
              <div className="text-grayscale-300 font-medium">2 buddies</div>
            </div>
            <ManageGuest />
          </div>
        </div>
      </div>
      <div>
        {/* Payment Type */}
        <div className="py-4 space-y-4">
          <h2 className="text-lg font-semibold">Payment Type</h2>
          <RadioGroup defaultValue="full" className="space-y-3">
            <Label>
              <SelectableCard
                onClick={() => setPaymentType("Full Payment")}
                isSelected={paymentType === "Full Payment"}
              >
                <div>
                  <div className="font-medium text-lg">Full Payment</div>
                  <div className="text-sm font-medium text-grayscale-300">
                    Pay the total (₱1,000.00) now and you're good to go.
                  </div>
                </div>
              </SelectableCard>
              <RadioGroupItem className="hidden" value="full" />
            </Label>
            <Label>
              <SelectableCard
                onClick={() => setPaymentType("Downpayment")}
                isSelected={paymentType === "Downpayment"}
              >
                <div>
                  <div className="font-medium text-lg">Downpayment</div>
                  <div className="text-sm font-medium text-grayscale-300">
                    ₱ 500 per head due today, the rest due on the day of the
                    event. No extra fees.
                  </div>
                </div>
              </SelectableCard>
              <RadioGroupItem className="hidden" value="down" />
            </Label>
          </RadioGroup>
        </div>

        {/* Pay with */}
        <div className="py-4 space-y-4">
          <h2 className="text-lg font-semibold">Pay with</h2>
          <RadioGroup defaultValue="card" className="space-y-3">
            {["Credit/Debit Card", "Gcash", "Maya", "Online Transfer"].map(
              (method) => (
                <Label key={method}>
                  <SelectableCard
                    isSelected={method === paymentMethod}
                    onClick={() => setPaymentMethod(method)}
                  >
                    <div className="flex items-center">
                      <span className="font-medium">{method}</span>
                    </div>
                    <RadioGroupItem
                      value={method.toLowerCase()}
                      className="hidden"
                    />
                  </SelectableCard>
                </Label>
              )
            )}
          </RadioGroup>

          <div className="flex items-center gap-2 mt-4">
            <Input
              type="number"
              placeholder="Add TravelCoin amount"
              className="flex-1  text-base"
            />
            <Button variant="secondary">Apply</Button>
          </div>
          <div className="flex items-center text-sm text-grayscale-300">
            {/* <div className="h-5 w-5 rounded-full bg-yellow-400" /> */}
            <img src={travelCoin} alt="travelcoin logo" className="w-5 h-5" />
            100 available
          </div>
        </div>

        {/* Payment Summary */}
        <div className="p-4 space-y-4 border rounded">
          <h2 className="text-lg font-semibold">Payment Summary</h2>
          <div className="space-y-3">
            <div className="font-medium">Package 1</div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-grayscale-300">Date</div>
              <div className="text-right">
                October 5-10
                <div className="text-grayscale-300">(5 days, 5 nights)</div>
              </div>

              <div className="text-grayscale-300">Buddies</div>
              <div className="text-right">2 Buddies</div>

              <div className="text-grayscale-300">Payment Type</div>
              <div className="text-right">Full Payment</div>

              <div className="text-grayscale-300">Booking fee</div>
              <div className="text-right">₱ 150</div>

              <div className="pt-2 border-t font-medium">Total</div>
              <div className="pt-2 border-t text-right font-medium">
                ₱ 1,850
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with two-step tab indicator */}
      <div className="fixed bottom-[72px] left-0 right-0 bg-white">
        <div className="max-w-md mx-auto">
          <div className="flex">
            <div className="w-1/2 h-1 bg-yellow-400" />
            <div className="w-1/2 h-1 bg-gray-200" />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="font-medium text-gray-600">Total</div>
              <div className="text-xl font-semibold">₱ 1,850</div>
            </div>
            <Button
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-600"
              size="lg"
            >
              Confirm and Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
