"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

type ViewMode = "dates" | "months";

export default function DatePicker() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 1)); // October 2024
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    new Date(2024, 9, 5)
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    new Date(2024, 9, 10)
  );
  const [viewMode, setViewMode] = useState<ViewMode>("dates");

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getDaysInPrevMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  };

  const renderMonthsView = (baseDate: Date) => {
    const currentMonth = baseDate.getMonth();
    const currentYear = baseDate.getFullYear();

    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        {months.map((month, index) => {
          const isCurrentMonth = index === currentMonth;
          return (
            <button
              key={month}
              onClick={() => {
                setCurrentDate(new Date(currentYear, index, 1));
                setViewMode("dates");
              }}
              className={cn(
                "p-2 rounded-lg text-sm hover:bg-gray-100",
                isCurrentMonth && "bg-sky-100 text-sky-700"
              )}
            >
              {month}
            </button>
          );
        })}
      </div>
    );
  };

  const renderCalendar = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDayOfMonth = getFirstDayOfMonth(date);
    const daysInPrevMonth = getDaysInPrevMonth(date);
    const days = [];

    // Add days from the previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      const dayNumber = daysInPrevMonth - firstDayOfMonth + i + 1;
      days.push(
        <div
          key={`prev-${i}`}
          className="w-10 h-10 flex items-center justify-center text-gray-300"
        >
          {dayNumber}
        </div>
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      const isSelected =
        (selectedStartDate &&
          currentDate >= selectedStartDate &&
          currentDate <= (selectedEndDate || selectedStartDate)) ||
        (selectedEndDate &&
          currentDate <= selectedEndDate &&
          currentDate >= (selectedStartDate || selectedEndDate));
      const isToday = currentDate.toDateString() === new Date().toDateString();

      days.push(
        <button
          key={i}
          onClick={() => handleDateClick(currentDate)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm
            ${isSelected ? "bg-sky-100" : ""}
            ${currentDate.toDateString() === selectedStartDate?.toDateString() ? "bg-sky-500 text-white" : ""}
            ${currentDate.toDateString() === selectedEndDate?.toDateString() ? "bg-sky-500 text-white" : ""}
            ${!isSelected && !isToday ? "hover:bg-gray-100" : ""}
            ${isToday && !isSelected ? "border border-sky-500" : ""}
          `}
        >
          {i}
        </button>
      );
    }

    // Add days from next month
    const totalDays = days.length;
    const daysToAdd = 42 - totalDays; // 6 rows of 7 days
    for (let i = 1; i <= daysToAdd; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="w-10 h-10 flex items-center justify-center text-gray-300"
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      if (date < selectedStartDate) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      } else {
        setSelectedEndDate(date);
      }
    }
  };

  const changeMonth = (increment: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    );
  };

  return (
    <div className="bg-white rounded-lg  max-w-md mx-auto">
      <div className="flex gap-2 p-1 mb-6 bg-gray-100 rounded-full">
        {(["dates", "months"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={cn(
              "flex-1 py-2 px-6 rounded-full text-sm font-medium capitalize transition-colors",
              viewMode === mode
                ? "bg-yellow-400 text-yellow-950"
                : "hover:bg-gray-200"
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      {viewMode === "dates" ? (
        // Date picker view
        <>
          {[0, 1].map((monthOffset) => (
            <div key={monthOffset} className="mb-6">
              <div className="flex justify-between items-center mb-4">
                {monthOffset === 0 ? (
                  <button
                    onClick={() => changeMonth(-1)}
                    className="p-2 rounded-full bg-amber-100 text-amber-600"
                  >
                    <ChevronLeft size={16} />
                  </button>
                ) : (
                  <div className="w-10"></div>
                )}
                <h3 className="text-lg font-semibold flex-grow text-center">
                  {
                    months[
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth() + monthOffset
                      ).getMonth()
                    ]
                  }{" "}
                  {currentDate.getFullYear() +
                    Math.floor((currentDate.getMonth() + monthOffset) / 12)}
                </h3>
                {monthOffset === 0 ? (
                  <button
                    onClick={() => changeMonth(1)}
                    className="p-2 rounded-full bg-amber-100 text-amber-600"
                  >
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <div className="w-10"></div>
                )}
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="w-10 h-10 flex items-center justify-center text-sky-500 font-medium"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 h-[240px]">
                {renderCalendar(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + monthOffset
                  )
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        // Month picker view
        <div className="min-h-[520px]">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear() - 1,
                    currentDate.getMonth(),
                    1
                  )
                )
              }
              className="p-2 rounded-full bg-amber-100 text-amber-600"
            >
              <ChevronLeft size={16} />
            </button>
            <h3 className="text-lg font-semibold">
              {currentDate.getFullYear()}
            </h3>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear() + 1,
                    currentDate.getMonth(),
                    1
                  )
                )
              }
              className="p-2 rounded-full bg-amber-100 text-amber-600"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          {renderMonthsView(currentDate)}
        </div>
      )}
    </div>
  );
}
