import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

interface Filters {
  search: string;
  dateRange: [dayjs.Dayjs, dayjs.Dayjs] | null;
  activeFilter?: string;
  statusFilter?: string;
}

interface TableItem {
  event?: string;
  schedule?: string;
  isActive?: boolean;
  status?: "upcoming" | "on-going" | "completed" | "cancelled";
  [key: string]: any;
}

const useTableFilters = <T extends TableItem>(initialData: T[]) => {
  const [filteredData, setFilteredData] = useState(initialData);
  const searchParams = useSearchParams();

  const handleFilterChange = useCallback(
    (filters: Filters) => {
      const applyFilters = (data: T[], filters: Filters) => {
        let filtered = data;

        if (filters.search) {
          filtered = filtered.filter((item) =>
            (item.event || "")
              .toLowerCase()
              .includes(filters.search.toLowerCase())
          );
        }

        if (filters.dateRange) {
          filtered = filtered.filter((item) => {
            if (!item.schedule) return true;
            const [start, end] = item.schedule
              .split(" - ")
              .map((date) => dayjs(date, "MMM DD"));
            return (
              (start!.isAfter(filters.dateRange![0]) ||
                start!.isSame(filters.dateRange![0])) &&
              (end!.isBefore(filters.dateRange![1]) ||
                end!.isSame(filters.dateRange![1]))
            );
          });
        }

        if (filters.activeFilter !== "all") {
          filtered = filtered.filter((item) =>
            filters.activeFilter === "active" ? item.isActive : !item.isActive
          );
        }

        if (filters.statusFilter !== "all") {
          filtered = filtered.filter(
            (item) => item.status === filters.statusFilter
          );
        }

        return filtered;
      };
      const newFilteredData = applyFilters(initialData, filters);
      setFilteredData(newFilteredData);
    },
    [initialData]
  );

  useEffect(() => {
    const filters: Filters = {
      search: searchParams.get("search") || "",
      dateRange:
        searchParams.get("startDate") && searchParams.get("end!Date")
          ? [
              dayjs(searchParams.get("startDate")),
              dayjs(searchParams.get("endDate")),
            ]
          : null,
      activeFilter: searchParams.get("activeFilter") || "all",
      statusFilter: searchParams.get("statusFilter") || "all",
    };

    handleFilterChange(filters);
  }, [searchParams, initialData, handleFilterChange]);

  return { filteredData, handleFilterChange };
};

export default useTableFilters;
