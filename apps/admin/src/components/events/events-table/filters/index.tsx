import { SearchOutlined } from "@ant-design/icons";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import {
  Button,
  DatePicker,
  Input,
  Radio,
  RadioChangeEvent,
  Space,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { EventTableFilterState } from "../../types";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const EventTableFilters: React.FC = () => {
  const search = getRouteApi("/dashboard/events/").useSearch();
  const navigate = useNavigate({ from: "/dashboard/events/" });

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
        search: (prev) => ({ ...prev, startDate: dates[1].toDate() }),
      });
    }
  };

  const handleActiveFilterChange = (e: RadioChangeEvent) => {
    navigate({
      search: (prev) => ({
        ...prev,
        activeFilter: e.target.value as EventTableFilterState["activeFilter"],
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
          aria-label="Filter events by date range"
        />
        <Radio.Group
          size="small"
          onChange={handleActiveFilterChange}
          value={search.activeFilter}
          aria-label="Filter by event status"
          buttonStyle="solid"
        >
          <Radio.Button value="all">All</Radio.Button>
          <Radio.Button value="active">Active</Radio.Button>
          <Radio.Button value="inactive">Inactive</Radio.Button>
        </Radio.Group>
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

export default EventTableFilters;
