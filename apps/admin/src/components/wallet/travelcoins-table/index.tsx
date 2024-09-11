import React from "react";
import { Table, Tag, Input, DatePicker, Button, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

const { RangePicker } = DatePicker;

interface TravelCoinsTransaction {
  key: string;
  date: string;
  type: "Donation" | "Earning" | "Discount" | "Blasting";
  travelCoins: number;
}

const columns: ColumnsType<TravelCoinsTransaction> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: string) => {
      const color =
        type === "Donation"
          ? "orange"
          : type === "Earning"
            ? "green"
            : type === "Discount"
              ? "red"
              : "purple";
      return <Tag color={color}>{type}</Tag>;
    },
  },
  {
    title: "TravelCoins",
    dataIndex: "travelCoins",
    key: "travelCoins",
    render: (travelCoins: number, record) => {
      const prefix =
        record.type === "Earning" || record.type === "Donation" ? "+" : "-";
      return (
        <span>
          {prefix}
          {travelCoins}
        </span>
      );
    },
  },
];

const data: TravelCoinsTransaction[] = [
  {
    key: "1",
    date: "2023-09-01",
    type: "Earning",
    travelCoins: 50,
  },
  // Add more sample data here
];

const TravelCoinsTransactionsTable: React.FC = () => {
  return (
    <Card>
      <Table<TravelCoinsTransaction>
        pagination={false}
        title={() => (
          <div className="flex items-center space-x-4 p-1">
            <Input
              size="small"
              placeholder="Search by type"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
            <RangePicker size="small" />
            <Button size="small">Clear Filters</Button>
          </div>
        )}
        size="small"
        columns={columns}
        dataSource={data}
      />
    </Card>
  );
};

export default TravelCoinsTransactionsTable;
