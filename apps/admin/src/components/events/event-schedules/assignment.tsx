import React from "react";
import { Modal, Form, Select } from "antd";
import { Schedule } from "./types";

const { Option } = Select;

// You should replace these with actual data from your API
const sampleCoordinators = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
];

const sampleVehicles = [
  { id: "1", name: "Van - Toyota HiAce" },
  { id: "2", name: "Bus - Hyundai County" },
  { id: "3", name: "Car - Honda Civic" },
];

interface AssignmentModalProps {
  schedule: Schedule | null;
  visible: boolean;
  onOk: (coordinatorId: string, vehicleId: string) => void;
  onCancel: () => void;
}

export const AssignmentModal: React.FC<AssignmentModalProps> = ({
  schedule,
  visible,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk(values.coordinatorId, values.vehicleId);
    });
  };

  React.useEffect(() => {
    if (schedule) {
      form.setFieldsValue({
        coordinatorId: schedule.coordinatorId,
        vehicleId: schedule.vehicleId,
      });
    }
  }, [schedule, form]);

  return (
    <Modal
      title="Assign Coordinator and Vehicle"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="coordinatorId"
          label="Coordinator"
          rules={[{ required: true, message: "Please select a coordinator" }]}
        >
          <Select placeholder="Select a coordinator">
            {sampleCoordinators.map((coordinator) => (
              <Option key={coordinator.id} value={coordinator.id}>
                {coordinator.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="vehicleId"
          label="Vehicle"
          rules={[{ required: true, message: "Please select a vehicle" }]}
        >
          <Select placeholder="Select a vehicle">
            {sampleVehicles.map((vehicle) => (
              <Option key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
