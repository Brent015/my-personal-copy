import {
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import React from "react";
import { Schedule } from "./types";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

interface AddScheduleModalProps {
  visible: boolean;
  onOk: (newSchedule: Omit<Schedule, "id">) => void;
  onCancel: () => void;
  existingSchedules: Schedule[];
}

export const AddScheduleModal: React.FC<AddScheduleModalProps> = ({
  visible,
  onOk,
  onCancel,
  existingSchedules,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newSchedule: Omit<Schedule, "id"> = {
        eventName: values.eventName,
        startDate: values.dateRange[0],
        endDate: values.dateRange[1],
        maxCapacity: values.maxCapacity,
        status: "Upcoming",
        bookings: 0,
        revenue: 0,
        paid: 0,
        toCollect: 0,
        color: values.color.toHexString(),
      };
      onOk(newSchedule);
      form.resetFields();
    });
  };

  const isDateConflicting = (date: Dayjs) => {
    return existingSchedules.some((schedule) =>
      date.isBetween(schedule.startDate, schedule.endDate, null, "[]")
    );
  };

  const disabledDate = (current: Dayjs) => {
    return isDateConflicting(current);
  };

  return (
    <Modal
      title="Add New Schedule"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="eventName"
          label="Event Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dateRange"
          label="Date Range"
          rules={[{ required: true }]}
        >
          <RangePicker disabledDate={disabledDate} className="w-full" />
        </Form.Item>
        <Form.Item
          name="maxCapacity"
          label="Max Capacity"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>
        <Form.Item
          name="color"
          label="Schedule Color"
          rules={[{ required: true }]}
        >
          <ColorPicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};
