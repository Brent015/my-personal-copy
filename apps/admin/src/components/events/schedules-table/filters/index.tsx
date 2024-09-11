import { SearchOutlined } from "@ant-design/icons";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { Button, DatePicker, Input, Select, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { SchedulesTableFilterState } from "../../types";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const SchedulesTableFilters: React.FC = () => {
  const search = getRouteApi("/dashboard/events/schedules").useSearch();
  const navigate = useNavigate({ from: "/dashboard/events/schedules" });

  const handleSearch = (value: string) =>
    navigate({ search: (prev) => ({ ...prev, search: value }) });

  const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null) => {
    if (dates?.[0]) {
      navigate({
        search: (prev) => ({ ...prev, startDate: dates[0].toDate() }),
      });
    }
    if (dates?.[1]) {
      navigate({
        search: (prev) => ({ ...prev, endDate: dates[1].toDate() }),
      });
    }
  };

  const handleActiveFilterChange = (e: SchedulesTableFilterState["status"]) => {
    navigate({
      search: (prev) => ({
        ...prev,
        status: e,
      }),
    });
  };

  const clearFilters = () => {
    navigate({
      search: () => ({}),
    });
  };

  return (
    <div className="pb-2">
      <Space size="middle" className="w-full">
        <Input
          size="small"
          placeholder="Search by event title"
          prefix={<SearchOutlined />}
          value={search.search}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search by event title"
          className="flex-grow"
        />
        <RangePicker
          size="small"
          // @ts-expect-error - figure out correc typing
          onChange={handleDateRangeChange}
          value={[dayjs(search.startDate), dayjs(search.endDate)]}
          aria-label="Filter schedules by date range"
        />
        <Select<SchedulesTableFilterState["status"]>
           size="small"
          className="w-32"
          defaultValue="all"
          value={search.status}
          onChange={handleActiveFilterChange}
          options={[
            { value: "all", label: "All" },
            { value: "ongoing", label: "On-Going" },
            { value: "upcoming", label: "Upcoming" },
            { value: "completed", label: "Completed" },
            { value: "cancelled", label: "Cancelled" },
          ]}
        />
        <Button
          size="small"
          onClick={clearFilters}
          aria-label="Clear all filters"
        >
          Clear Filters
        </Button>
      </Space>
    </div>
  );
};

export default SchedulesTableFilters;
