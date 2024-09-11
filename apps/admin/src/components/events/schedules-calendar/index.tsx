import React, { useState } from "react";
import { Card, Calendar, Tooltip } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface ScheduleCalendarViewProps {
  schedules: Array<{
    startDate: Date;
    endDate: Date;
    maxGuests: number;
  }>;
  eventName: string;
}

const ScheduleCalendar: React.FC<ScheduleCalendarViewProps> = ({
  schedules,
  eventName,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (start.year() !== end.year()) {
      return `${start.format("MMM D, YYYY")} - ${end.format("MMM D, YYYY")}`;
    } else if (start.month() !== end.month()) {
      return `${start.format("MMM D")} - ${end.format("MMM D, YYYY")}`;
    } else {
      return `${start.format("MMM D")} - ${end.format("D, YYYY")}`;
    }
  };

  const cellRender = (current: Dayjs) => {
    const schedulesForDate = schedules.filter(
      (schedule) =>
        dayjs(schedule.startDate).isSame(current, "day") ||
        dayjs(schedule.endDate).isSame(current, "day") ||
        (dayjs(schedule.startDate).isBefore(current, "day") &&
          dayjs(schedule.endDate).isAfter(current, "day"))
    );

    return (
      <ul className="events flex flex-col gap-1">
        {schedulesForDate.map((schedule, index) => (
          <li key={index}>
            <Tooltip
              title={`${eventName}: ${formatDateRange(schedule.startDate, schedule.endDate)}, Max Guests: ${schedule.maxGuests}`}
            >
              <div className="text-xs bg-blue-500 text-white px-1 rounded">
                {`${eventName} (${schedule.maxGuests})`}
              </div>
            </Tooltip>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card title="Event Calendar" className="mb-6">
      <Calendar
        value={selectedDate}
        onSelect={(newValue) => setSelectedDate(newValue)}
        cellRender={cellRender}
      />
    </Card>
  );
};

export default ScheduleCalendar;
