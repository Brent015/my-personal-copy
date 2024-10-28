import { DatePicker, Form, InputNumber, Modal } from "antd";
import React from "react";
import { Schedule } from "./types";

const { RangePicker } = DatePicker;

interface EditScheduleModalProps {
  schedule: Schedule | null;
  visible: boolean;
  onOk: (updatedSchedule: Schedule) => void;
  onCancel: () => void;
}

export const EditScheduleModal: React.FC<EditScheduleModalProps> = ({
  schedule,
  visible,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk({
        ...schedule,
        ...values,
        startDate: values.dateRange[0],
        endDate: values.dateRange[1],
      });
    });
  };

  React.useEffect(() => {
    if (schedule) {
      form.setFieldsValue({
        ...schedule,
        dateRange: [schedule.startDate, schedule.endDate],
      });
    }
  }, [schedule, form]);

  return (
    <Modal
      title="Edit Schedule"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="dateRange"
          label="Date Range"
          rules={[{ required: true }]}
        >
          <RangePicker className="w-full" />
        </Form.Item>
        <Form.Item
          name="maxCapacity"
          label="Max Capacity"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
