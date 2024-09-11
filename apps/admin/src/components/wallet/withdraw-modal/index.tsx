import React, { useState } from "react";
import { Modal, Form, Input, Select, InputNumber, Button } from "antd";

const { Option } = Select;

interface WithdrawModalProps {
  visible: boolean;
  onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [withdrawableAmount, setWithdrawableAmount] = useState(10000); // This should come from an API

  const handleWithdraw = (values: any) => {
    console.log("Withdraw:", values);
    // Here you would typically make an API call to process the withdrawal
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title="Withdraw Funds"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleWithdraw}>
        <Form.Item label="Withdrawable Amount">
          <Input value={`${withdrawableAmount.toFixed(2)} PHP`} disabled />
        </Form.Item>
        <Form.Item
          name="destinationAccount"
          label="Destination Account"
          rules={[
            { required: true, message: "Please select a destination account" },
          ]}
        >
          <Select placeholder="Select a bank account">
            <Option value="account1">Bank Account 1</Option>
            <Option value="account2">Bank Account 2</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount to Withdraw"
          rules={[
            { required: true, message: "Please enter an amount" },
            {
              type: "number",
              min: 1,
              max: withdrawableAmount,
              message: "Invalid amount",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item name="notes" label="Notes (Optional)">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Withdraw
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WithdrawModal;
