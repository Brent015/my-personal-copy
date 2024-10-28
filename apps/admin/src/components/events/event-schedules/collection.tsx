import useCurrencyInput from "@/hooks/useCurrencyInput";
import { formatDateRange } from "@/utils/format";
import { Button, Form, InputNumber, Modal, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Guest, Schedule } from "./types";

const { Title } = Typography;

interface CollectionModalProps {
  schedule: Schedule | null;
  visible: boolean;
  onOk: (guestId: string, amount: number) => void;
  onCancel: () => void;
}

interface GuestTableData extends Guest {
  key: string;
  actions: React.ReactNode;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({
  schedule,
  visible,
  onOk,
  onCancel,
}) => {
  const { parser, formatter } = useCurrencyInput();
  const [form] = Form.useForm();
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  useEffect(() => {
    if (schedule) {
      form.resetFields();
    }
  }, [schedule, form]);

  const handleCollect = (guest: Guest) => {
    setSelectedGuest(guest);
    form.setFieldsValue({ amount: guest.balance });
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (selectedGuest) {
        onOk(selectedGuest.id, values.amount);
      }
    });
  };

  const columns = [
    {
      title: "Guest Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (value: number) => formatter(value),
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (value: number) => formatter(value),
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value: number) => formatter(value),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Guest) => (
        <Button
          onClick={() => handleCollect(record)}
          disabled={record.balance === 0}
        >
          {record.balance === 0 ? "Paid" : "Collect"}
        </Button>
      ),
    },
  ];

  const dataSource: GuestTableData[] =
    schedule?.guests?.map((guest) => ({
      ...guest,
      key: guest.id,
      actions: (
        <Button
          onClick={() => handleCollect(guest)}
          disabled={guest.balance === 0}
        >
          {guest.balance === 0 ? "Paid" : "Collect"}
        </Button>
      ),
    })) || [];

  return (
    <Modal
      title={`Collection - ${schedule?.eventName} (${formatDateRange(schedule!.startDate.toDate(), schedule!.endDate.toDate())})`}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={800}
      okButtonProps={{ disabled: !selectedGuest }}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        className="mb-4"
      />
      {selectedGuest && (
        <Form form={form} layout="vertical">
          <Title level={5}>Collect Payment for {selectedGuest.name}</Title>
          <Form.Item
            name="amount"
            label="Amount to Collect"
            rules={[
              { required: true, message: "Please enter the amount to collect" },
            ]}
          >
            <InputNumber
              min={0}
              max={selectedGuest.balance}
              formatter={formatter}
              parser={parser}
              className="w-full"
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
