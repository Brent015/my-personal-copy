"use client";

import { Calendar, ConfigProvider, Popover, Radio, Select, theme } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useState } from "react";
import styles from "./styles.module.scss";

import localeData from "dayjs/plugin/localeData";
const { useToken } = theme;
dayjs.extend(localeData);

const { Option } = Select;

interface HeaderRenderProps {
  value: Dayjs;
  type: "month" | "year";
  onChange: (date: Dayjs) => void;
  onTypeChange: (type: "month" | "year") => void;
}

interface Event {
  date: string;
  title: string;
}

const events: Event[] = [{ date: "2024-08-10", title: "Important Event" }];

const DashboardCalendar = () => {
  const { token } = useToken();
  const [date, setDate] = useState<Dayjs>();
  const [mode, setMode] = useState<"month" | "year">("month");

  const handlePanelChange = (value: Dayjs, mode: "month" | "year"): void => {
    console.log(value, mode);
    setDate(value);
    setMode(mode);
  };

  const headerRender = ({
    value,
    type,
    onChange,
    onTypeChange,
  }: HeaderRenderProps): React.ReactNode => {
    const months = dayjs.monthsShort();
    const year = value.year();
    const month = value.month();

    return (
      <div className={styles.customHeader}>
        <div>
          <Select
            variant="borderless"
            size="small"
            value={year}
            onChange={(newYear: number) => {
              const now = value.clone().year(newYear);
              onChange(now);
            }}
            style={{ marginRight: 8 }}
          >
            {[...Array(10)].map((_, i) => (
              <Option key={year - 5 + i} value={year - 5 + i}>
                {year - 5 + i}
              </Option>
            ))}
          </Select>
          <Select
            variant="borderless"
            size="small"
            value={month}
            onChange={(newMonth: number) => {
              const now = value.clone().month(newMonth);
              onChange(now);
            }}
          >
            {months.map((monthName, index) => (
              <Option key={`${index}`} value={index}>
                {monthName}
              </Option>
            ))}
          </Select>
        </div>
        <Radio.Group
          size="small"
          onChange={(e) => onTypeChange(e.target.value)}
          value={type}
          buttonStyle="solid"
        >
          <Radio.Button value="month">Month</Radio.Button>
          <Radio.Button value="year">Year</Radio.Button>
        </Radio.Group>
      </div>
    );
  };

  const dateFullCellRender = (value: Dayjs) => {
    const dateString = value.format("YYYY-MM-DD");
    const hasEvent = events.some((event) => event.date === dateString);

    return (
      <Popover content={"hello"} title="Title">
        <div
          className={`ant-picker-cell-inner ant-picker-calendar-date ${hasEvent ? styles.eventDate : ""}`}
        >
          <div className="ant-picker-calendar-date-value">
            {value.format("DD")}
          </div>
          <div className="ant-picker-calendar-date-content"></div>
        </div>
      </Popover>
    );
  };

  return (
    <div
      style={{
        width: 300,
        border: `1px solid ${token.colorBorderSecondary},`,
        borderRadius: token.borderRadius,
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              // buttonBg: "transparent",
              // colorPrimary: "#282828",
              // colorBorder: "none",
            },
          },
        }}
      >
        <Calendar
          className={styles.eventCalendar}
          value={date}
          onChange={setDate}
          onPanelChange={handlePanelChange}
          fullCellRender={dateFullCellRender}
          headerRender={headerRender}
          fullscreen={false}
          mode={mode}
        />
      </ConfigProvider>
    </div>
  );
};

export default DashboardCalendar;
