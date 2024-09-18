import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  MoneyCollectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Dropdown,
  Image,
  InputNumber,
  MenuProps,
  Table,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { AllScheduleData, SchedulesTableFilterState } from "../types";
import ScheduleFilters from "./filters";

const { RangePicker } = DatePicker;

const initialData: AllScheduleData[] = [
  {
    key: "1",
    event: "Jimbaran beach",
    eventImage: "https://loremflickr.com/320/240/philippines,beach",
    startDate: dayjs().add(1, "week"),
    endDate: dayjs().add(1, "week").add(5, "day"),
    bookings: 6,
    maxCapacity: 30,
    paid: 9970,
    toCollect: 25874,
    totalEarnings: 89970,
    status: "Ongoing",
    id: "",
    eventName: "",
  },
  // Add more sample data here...
];

const getStatusTag = (status: string) => {
  const colorMap: { [key: string]: string } = {
    upcoming: "blue",
    ongoing: "green",
    completed: "orange",
    cancelled: "red",
  };
  return (
    <Tag color={colorMap[status]} className="capitalize">
      {status}
    </Tag>
  );
};

const actionItems: MenuProps["items"] = [
  {
    key: "1",
    icon: <MoneyCollectOutlined />,
    label: "Collection",
  },
  {
    key: "2",
    icon: <EditOutlined />,
    label: "Edit",
  },
  {
    key: "3",
    icon: <UserOutlined />,
    label: "Assignment",
  },
  {
    key: "4",
    icon: <DeleteOutlined />,
    label: "Cancel",
    danger: true,
  },
];

const SchedulesTable: React.FC = () => {
  const search = getRouteApi("/dashboard/events/schedules").useSearch();
  const navigate = useNavigate({ from: "/dashboard/events/schedules" });
  const [data, setData] = useState<AllScheduleData[]>(initialData);
  const [editingField, setEditingField] = useState<{
    key: string;
    field: keyof AllScheduleData;
  } | null>(null);

  const handleDoubleClick = (
    record: AllScheduleData,
    field: keyof AllScheduleData
  ) => {
    setEditingField({ key: record.key, field });
  };

  const handleSave = (
    key: string,
    field: keyof AllScheduleData,
    value: string | number
  ) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setData(newData);
    setEditingField(null);
  };

  const columns: ColumnsType<AllScheduleData> = [
    {
      title: "Thumbnail",
      dataIndex: "eventImage",
      key: "thumbnail",
      render: (image: string) => (
        <Image
          className="rounded-md"
          src={image}
          alt="Event thumbnail"
          width={80}
          height={60}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
    },
    {
      title: "Schedule",
      dataIndex: "startDate",
      key: "startDate",
      defaultSortOrder: search.sortOrder,
      render: (date: Dayjs, record) => {
        const isEditing =
          editingField?.key === record.key &&
          editingField.field === "startDate";
        return isEditing ? (
          <RangePicker
            format="MMM DD"
            defaultValue={[dayjs(record.startDate), dayjs(record.endDate)]}
            onChange={(dates, dateStrings) => {
              if (dates) {
                handleSave(record.key, "startDate", `${dateStrings[0]}`);
                handleSave(record.key, "endDate", `${dateStrings[1]}`);
              }
            }}
            onBlur={() => setEditingField(null)}
            autoFocus
          />
        ) : (
          <div onDoubleClick={() => handleDoubleClick(record, "startDate")}>
            {date.format("MMM D")} - {record.endDate.format("MMM D YYYY")}
          </div>
        );
      },
      sorter: (a, b) => a.endDate.unix() - b.endDate.unix(),
    },
    {
      title: "Guests",
      dataIndex: "bookings",
      key: "bookings",
      render: (text, record) => `${text} / ${record.maxCapacity} guests`,
      sorter: (a, b) => a.bookings - b.bookings,
    },
    {
      title: "Max Guests",
      dataIndex: "maxCapacity",
      key: "maxCapacity",
      render: (text, record) => {
        const isEditing =
          editingField?.key === record.key &&
          editingField.field === "maxCapacity";
        return isEditing ? (
          <InputNumber
            min={1}
            defaultValue={text}
            onPressEnter={(e) =>
              handleSave(
                record.key,
                "maxCapacity",
                Number((e.target as HTMLInputElement).value)
              )
            }
            onBlur={(e) =>
              handleSave(record.key, "maxCapacity", Number(e.target.value))
            }
            autoFocus
          />
        ) : (
          <div onDoubleClick={() => handleDoubleClick(record, "maxCapacity")}>
            {text}
          </div>
        );
      },
    },
    {
      title: "Paid",
      dataIndex: "paid",
      key: "paid",
      sorter: (a, b) => a.paid - b.paid,
    },
    {
      title: "To collect",
      dataIndex: "toCollect",
      key: "toCollect",
      sorter: (a, b) => a.toCollect - b.toCollect,
    },
    {
      title: "Earnings",
      dataIndex: "totalEarnings",
      key: "totalEarnings",
      sorter: (a, b) => a.totalEarnings - b.totalEarnings,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => getStatusTag(status),
      filters: [
        { text: "Upcoming", value: "upcoming" },
        { text: "Ongoing", value: "ongoing" },
        { text: "Completed", value: "completed" },
        { text: "Cancelled", value: "cancelled" },
      ],
      defaultFilteredValue: search.status,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown
          menu={{ items: actionItems }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Card>
      <Table<AllScheduleData>
        sortDirections={["ascend", "descend", "ascend"]}
        onChange={(_, filters, sorter) => {
          // console.log(filters);
          // // Ensure sorter is treated as an array
          const sorterResult = Array.isArray(sorter) ? sorter[0] : sorter;
          navigate({
            search: (prev) => ({
              ...prev,
              sortField:
                sorterResult.field as SchedulesTableFilterState["sortField"],
              sortOrder:
                sorterResult.order as SchedulesTableFilterState["sortOrder"],
              status: filters.status as SchedulesTableFilterState["status"],
            }),
          });
        }}
        title={() => <ScheduleFilters />}
        size="small"
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ overflow: "hidden" }}
        aria-label="Schedules table"
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={11}>
              <div role="status" aria-live="polite">
                Total {data.length} schedules listed
              </div>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </Card>
  );
};

export default SchedulesTable;
