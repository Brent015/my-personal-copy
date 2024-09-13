import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  MoneyCollectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Dropdown,
  Image,
  InputNumber,
  MenuProps,
  Table,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React, { useState } from "react";

import ScheduleFilters from "./filters";
import { ScheduleData } from "../types";

const { RangePicker } = DatePicker;


const initialData: ScheduleData[] = [
  {
    key: "1",
    event: "Jimbaran beach",
    eventImage: "https://loremflickr.com/320/240/philippines,beach",
    schedule: "Oct 09 - Oct 12",
    booked: "6",
    maxGuests: 30,
    paid: "9,970 php",
    toCollect: "25,874 php",
    totalEarnings: "89,970 php",
    status: "on-going",
  },
  // Add more sample data here...
];

const getStatusTag = (status: string) => {
  const colorMap: { [key: string]: string } = {
    upcoming: "blue",
    "on-going": "green",
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
  const [data, setData] = useState<ScheduleData[]>(initialData);
  const [editingField, setEditingField] = useState<{
    key: string;
    field: keyof ScheduleData;
  } | null>(null);

  const handleDoubleClick = (
    record: ScheduleData,
    field: keyof ScheduleData
  ) => {
    setEditingField({ key: record.key, field });
  };

  const handleSave = (
    key: string,
    field: keyof ScheduleData,
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

  const columns: ColumnsType<ScheduleData> = [
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
      dataIndex: "schedule",
      key: "schedule",
      render: (text, record) => {
        const isEditing =
          editingField?.key === record.key && editingField.field === "schedule";
        return isEditing ? (
          <RangePicker
            format="MMM DD"
            defaultValue={[
              dayjs(text.split(" - ")[0]),
              dayjs(text.split(" - ")[1]),
            ]}
            onChange={(dates, dateStrings) => {
              if (dates) {
                handleSave(
                  record.key,
                  "schedule",
                  `${dateStrings[0]} - ${dateStrings[1]}`
                );
              }
            }}
            onBlur={() => setEditingField(null)}
            autoFocus
          />
        ) : (
          <div onDoubleClick={() => handleDoubleClick(record, "schedule")}>
            {text}
          </div>
        );
      },
    },
    {
      title: "Booked",
      dataIndex: "booked",
      key: "booked",
      render: (text, record) => `${text} / ${record.maxGuests} guests`,
    },
    {
      title: "Max Guests",
      dataIndex: "maxGuests",
      key: "maxGuests",
      render: (text, record) => {
        const isEditing =
          editingField?.key === record.key &&
          editingField.field === "maxGuests";
        return isEditing ? (
          <InputNumber
            min={1}
            defaultValue={text}
            onPressEnter={(e) =>
              handleSave(
                record.key,
                "maxGuests",
                Number((e.target as HTMLInputElement).value)
              )
            }
            onBlur={(e) =>
              handleSave(record.key, "maxGuests", Number(e.target.value))
            }
            autoFocus
          />
        ) : (
          <div onDoubleClick={() => handleDoubleClick(record, "maxGuests")}>
            {text}
          </div>
        );
      },
    },
    {
      title: "Paid",
      dataIndex: "paid",
      key: "paid",
    },
    {
      title: "To collect",
      dataIndex: "toCollect",
      key: "toCollect",
    },
    {
      title: "Revenue",
      dataIndex: "totalEarnings",
      key: "totalEarnings",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => getStatusTag(status),
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
    <Table<ScheduleData>
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
  );
};

export default SchedulesTable;
