import React from "react";
import { Modal, Form, InputNumber } from "antd";
import { Schedule } from "./types";
import useCurrencyInput from "@/hooks/useCurrencyInput";

interface CollectionModalProps {
  schedule: Schedule | null;
  visible: boolean;
  onOk: (amount: number) => void;
  onCancel: () => void;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({
  schedule,
  visible,
  onOk,
  onCancel,
}) => {
  const { parser, formatter } = useCurrencyInput();
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk(values.amount);
    });
  };

  React.useEffect(() => {
    if (schedule) {
      form.setFieldsValue({ amount: schedule.toCollect });
    }
  }, [schedule, form]);

  return (
    <Modal
      title="Collect Payment"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="amount"
          label="Amount to Collect"
          rules={[
            { required: true, message: "Please enter the amount to collect" },
          ]}
        >
          <InputNumber
            min={0}
            max={schedule?.toCollect}
            formatter={formatter}
            parser={parser}
            className="w-full"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
