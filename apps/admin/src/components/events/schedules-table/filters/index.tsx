import { SearchOutlined } from "@ant-design/icons";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { DatePicker, Input, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";

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
        search: (prev) => ({ ...prev, startDate: dates[0].toISOString() }),
      });
    }
    if (dates?.[1]) {
      navigate({
        search: (prev) => ({ ...prev, endDate: dates[1].toISOString() }),
      });
    }
  };

  return (
    <div className="pb-2">
      <Space size="middle" className="w-full">
        <Input
          placeholder="Search by event title"
          prefix={<SearchOutlined />}
          value={search.search}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search by event title"
          className="flex-grow"
        />
        <RangePicker
          // @ts-expect-error - figure out correc typing
          onChange={handleDateRangeChange}
          value={[dayjs(search.startDate), dayjs(search.endDate)]}
          aria-label="Filter schedules by date range"
        />
      </Space>
    </div>
  );
};

export default SchedulesTableFilters;
