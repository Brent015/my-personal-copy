import {
  ColorPicker,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Select,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import React from "react";
import { Schedule } from "./types";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

// Sample data for coordinators
const sampleCoordinators = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
  { id: "4", name: "Sarah Williams" },
  { id: "5", name: "Chris Lee" },
];

// Sample data for vehicles
const sampleVehicles = [
  { id: "1", name: "Van - Toyota HiAce" },
  { id: "2", name: "Bus - Hyundai County" },
  { id: "3", name: "Car - Honda Civic" },
  { id: "4", name: "SUV - Ford Everest" },
  { id: "5", name: "Minibus - Mercedes-Benz Sprinter" },
];

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
        totalEarnings: 0,
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
          name="dateRange"
          label="Date Range"
          rules={[{ required: true }]}
        >
          <RangePicker disabledDate={disabledDate} className="w-full" />
        </Form.Item>
        <Form.Item
          name="maxCapacity"
          label={<span className="flex items-center">Max Guests</span>}
          rules={[{ required: true }]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>
        <Form.Item label="Coordinator">
          <Select
            className="w-full"
            allowClear
            placeholder="Select a coordinator"
          >
            {sampleCoordinators.map((coordinator) => (
              <Select.Option key={coordinator.id} value={coordinator.id}>
                {coordinator.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Vehicle">
          <Select className="w-full" allowClear placeholder="Select a vehicle">
            {sampleVehicles.map((vehicle) => (
              <Select.Option key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </Select.Option>
            ))}
          </Select>
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
