// src/components/settings/TransportationSettings.tsx
import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

interface Vehicle {
  id: string;
  driverName: string;
  plateNumber: string;
  maxSeat: number;
  brandModel: string;
  color: string;
  photo: string;
  location: string;
  status: "Active" | "Inactive";
}

const transportationData: Vehicle[] = [
  {
    id: "1",
    driverName: "Carlos Reyes",
    plateNumber: "ABC 123",
    maxSeat: 15,
    brandModel: "Toyota HiAce",
    color: "White",
    photo: "https://example.com/vehicle1.jpg",
    location: "Manila City Center",
    status: "Active",
  },
  {
    id: "2",
    driverName: "Elena Gomez",
    plateNumber: "XYZ 789",
    maxSeat: 7,
    brandModel: "Mitsubishi Montero Sport",
    color: "Black",
    photo: "https://example.com/vehicle2.jpg",
    location: "Quezon City",
    status: "Active",
  },
  {
    id: "3",
    driverName: "Roberto Tan",
    plateNumber: "DEF 456",
    maxSeat: 30,
    brandModel: "Hyundai County",
    color: "Blue",
    photo: "https://example.com/vehicle3.jpg",
    location: "Makati City",
    status: "Active",
  },
  {
    id: "4",
    driverName: "Ana Santos",
    plateNumber: "GHI 789",
    maxSeat: 4,
    brandModel: "Toyota Vios",
    color: "Silver",
    photo: "https://example.com/vehicle4.jpg",
    location: "Pasay City",
    status: "Inactive",
  },
];

const TransportationSettings: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(transportationData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text: string) => (
        <img
          src={text}
          alt="Vehicle"
          className="w-16 h-12 object-cover rounded"
        />
      ),
    },
    {
      title: "Driver Name",
      dataIndex: "driverName",
      key: "driverName",
    },
    {
      title: "Plate Number",
      dataIndex: "plateNumber",
      key: "plateNumber",
    },
    {
      title: "Max Seat",
      dataIndex: "maxSeat",
      key: "maxSeat",
    },
    {
      title: "Brand/Model",
      dataIndex: "brandModel",
      key: "brandModel",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <span className={text === "Active" ? "text-green-500" : "text-red-500"}>
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: null, record: Vehicle) => (
        <Button onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
  ];

  const handleEdit = (record: Vehicle) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const newVehicle: Vehicle = {
        id: values.id || Date.now().toString(),
        ...values,
      };
      setVehicles((prev) =>
        prev.some((v) => v.id === newVehicle.id)
          ? prev.map((v) => (v.id === newVehicle.id ? newVehicle : v))
          : [...prev, newVehicle]
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
        Add Vehicle
      </Button>
      <Table columns={columns} dataSource={vehicles} rowKey="id" />
      <Modal
        title="Vehicle Details"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="driverName"
            label="Driver Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="plateNumber"
            label="Plate Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="maxSeat"
            label="Max Seat"
            rules={[{ required: true, type: "number" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="brandModel"
            label="Brand/Model"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="color" label="Color" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="photo" label="Photo">
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="location"
            label="Location (where the driver can pickup)"
          >
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TransportationSettings;
