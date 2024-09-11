import React from "react";
import { Table, Tag, Input, DatePicker, Button, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

const { RangePicker } = DatePicker;

interface WalletTransaction {
  key: string;
  name: string;
  date: string;
  type: "Earnings" | "Refunds" | "Withdrawals";
  amount: number;
  status: "Pending" | "Completed" | "Failed";
}

const columns: ColumnsType<WalletTransaction> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
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
        type === "Earnings" ? "green" : type === "Refunds" ? "orange" : "blue";
      return <Tag color={color}>{type}</Tag>;
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (amount: number) => `${amount.toFixed(2)} PHP`,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const color =
        status === "Completed"
          ? "green"
          : status === "Pending"
            ? "orange"
            : "red";
      return <Tag color={color}>{status}</Tag>;
    },
  },
];

const data: WalletTransaction[] = [
  {
    key: "1",
    name: "Event A Earnings",
    date: "2023-09-01",
    type: "Earnings",
    amount: 5000,
    status: "Completed",
  },
  // Add more sample data here
];

const WalletTransactionsTable: React.FC = () => {
  return (
    <Card>
      <Table<WalletTransaction>
        pagination={false}
        title={() => (
          <div className="flex items-center space-x-4 p-1">
            <Input
              size="small"
              placeholder="Search by name"
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
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={5}>
              <div role="status" aria-live="polite">
                Total {data.length} transactions listed
              </div>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </Card>
  );
};

export default WalletTransactionsTable;
