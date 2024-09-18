import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

interface Bank {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

const banksData = [
  {
    id: "1",
    bankName: "BDO",
    accountNumber: "1234567890",
    accountHolderName: "Adventure Seekers Travel Co.",
  },
  {
    id: "2",
    bankName: "BPI",
    accountNumber: "0987654321",
    accountHolderName: "Maria Santos",
  },
  {
    id: "3",
    bankName: "GCash",
    accountNumber: "09123456789",
    accountHolderName: "Maria Santos",
  },
];

const BankSettings: React.FC = () => {
  const [banks, setBanks] = useState<Bank[]>(banksData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    {
      title: "Account Holder Name",
      dataIndex: "accountHolderName",
      key: "accountHolderName",
    },
    {
      title: "Action",
      key: "action",
      render: (_: null, record: Bank) => (
        <Button onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
  ];

  const handleEdit = (record: Bank) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const newBank: Bank = {
        id: values.id || Date.now().toString(),
        ...values,
      };
      setBanks((prev) =>
        prev.some((b) => b.id === newBank.id)
          ? prev.map((b) => (b.id === newBank.id ? newBank : b))
          : [...prev, newBank]
      );
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        className="mb-4"
      >
        Add Bank
      </Button>
      <Table columns={columns} dataSource={banks} rowKey="id" />
      <Modal
        title="Bank Details"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="bankName"
            label="Bank Name"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="BDO">BDO</Option>
              <Option value="BPI">BPI</Option>
              <Option value="Metrobank">Metrobank</Option>
              <Option value="GCash">GCash</Option>
              <Option value="PayMaya">PayMaya</Option>
              {/* Add more banks/e-wallets as needed */}
            </Select>
          </Form.Item>
          <Form.Item
            name="accountNumber"
            label="Account Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="accountHolderName"
            label="Account Holder Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BankSettings;
