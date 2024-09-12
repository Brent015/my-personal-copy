import React from "react";
import { Modal, Form, Input } from "antd";
import { Schedule } from "./types";

interface CancelModalProps {
  schedule: Schedule | null;
  visible: boolean;
  onOk: (reason: string) => void;
  onCancel: () => void;
}

export const CancelModal: React.FC<CancelModalProps> = ({
  schedule,
  visible,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk(values.reason);
    });
  };

  return (
    <Modal
      title="Cancel Schedule"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <p>Are you sure you want to cancel this schedule?</p>
      {schedule && schedule.bookings > 0 && (
        <p className="text-red-500">
          Warning: There are {schedule.bookings} travelers booked for this
          schedule. They will be notified of the cancellation.
        </p>
      )}
      <Form form={form} layout="vertical">
        <Form.Item
          name="reason"
          label="Reason for cancellation"
          rules={[
            {
              required: true,
              message: "Please provide a reason for cancellation",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
