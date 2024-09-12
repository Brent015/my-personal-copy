import { Badge, BadgeProps, Calendar, Tooltip } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { Schedule } from "./types";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);


interface ScheduleCalendarProps {
  schedules: Schedule[];
  onScheduleClick: (schedule: Schedule) => void;
}

export const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({
  schedules,
  onScheduleClick,
}) => {
  const getListData = (value: Dayjs) => {
    return schedules.filter(
      (schedule) =>
        value.isSameOrAfter(schedule.startDate, "day") &&
        value.isSameOrBefore(schedule.endDate, "day")
    );
  };

  const getStatusColor = (status: Schedule["status"]): BadgeProps["status"] => {
    switch (status) {
      case "Upcoming":
        return "processing";
      case "Ongoing":
        return "success";
      case "Completed":
        return "default";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Calendar
      cellRender={(current: Dayjs, info) => {
        if (info.type === "date") {
          const listData = getListData(current);
          return (
            <ul className="events p-0 m-0">
              {listData.map((item) => (
                <li key={item.id} className="list-none mb-1">
                  <Tooltip
                    title={
                      <div>
                        <p>{item.eventName}</p>
                        <p>
                          Bookings: {item.bookings}/{item.maxCapacity}
                        </p>
                        <p>Status: {item.status}</p>
                      </div>
                    }
                  >
                    <span
                      onClick={() => {
                        onScheduleClick(item);
                      }}
                    >
                      <Badge
                        status={getStatusColor(item.status)}
                        text={item.eventName}
                        className="cursor-pointer text-xs"
                      />
                    </span>
                  </Tooltip>
                </li>
              ))}
            </ul>
          );
        }
        if (info.type === "month") {
          const listData = getListData(current);
          const count = listData.length;
          return count > 0 ? (
            <div className="notes-month">
              <section>{count} event(s)</section>
            </div>
          ) : null;
        }
        return null;
      }}
      className="schedule-calendar"
    />
  );
};
