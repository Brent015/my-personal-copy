import { SearchOutlined } from "@ant-design/icons";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { Button, Input, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";

dayjs.extend(customParseFormat);

const EventTableFilters: React.FC = () => {
  const search = getRouteApi("/dashboard/events/").useSearch();
  const navigate = useNavigate({ from: "/dashboard/events/" });

  const handleSearch = (value: string) =>
    navigate({ search: (prev) => ({ ...prev, search: value }) });

  const clearFilters = () =>
    navigate({
      search: () => ({}),
    });

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

        <Button onClick={clearFilters} aria-label="Clear all filters">
          Clear Filters
        </Button>
      </Space>
    </div>
  );
};

export default EventTableFilters;
