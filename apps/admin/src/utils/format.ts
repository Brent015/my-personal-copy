import dayjs from "dayjs";

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDateRange = (startDate: Date, endDate: Date) => {
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

export const formatDate = (date: Date) => {
  const start = dayjs(date);
  return start.format("MMM D, YYYY");
};
