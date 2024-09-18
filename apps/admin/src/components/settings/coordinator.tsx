// src/components/settings/CoordinatorSettings.tsx
import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

interface Coordinator {
  id: string;
  role: string;
  profilePhoto: string;
  fullName: string;
  shortIntro: string;
  status: "Active" | "Inactive";
}
const coordinatorsData: Coordinator[] = [
  {
    id: "1",
    role: "admin",
    profilePhoto: "https://example.com/maria.jpg",
    fullName: "Maria Santos",
    shortIntro:
      "Founder and lead adventure coordinator with 10 years of experience.",
    status: "Active",
  },
  {
    id: "2",
    role: "coordinator",
    profilePhoto: "https://example.com/john.jpg",
    fullName: "John Doe",
    shortIntro: "Experienced mountain guide and wilderness first responder.",
    status: "Active",
  },
  {
    id: "3",
    role: "coordinator",
    profilePhoto: "https://example.com/lisa.jpg",
    fullName: "Lisa Chen",
    shortIntro: "Certified scuba instructor and marine life expert.",
    status: "Active",
  },
  {
    id: "4",
    role: "coordinator",
    profilePhoto: "https://example.com/miguel.jpg",
    fullName: "Miguel Rodriguez",
    shortIntro:
      "Cultural tour specialist with a focus on indigenous communities.",
    status: "Inactive",
  },
];

const CoordinatorSettings: React.FC = () => {
  const [coordinators, setCoordinators] =
    useState<Coordinator[]>(coordinatorsData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Profile Photo",
      dataIndex: "profilePhoto",
      key: "profilePhoto",
      render: (text: string) => (
        <img src={text} alt="Profile" className="w-10 h-10 rounded-full" />
      ),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
      render: (_: null, record: Coordinator) => (
        <Button onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
  ];

  const handleEdit = (record: Coordinator) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const newCoordinator: Coordinator = {
        id: values.id || Date.now().toString(),
        ...values,
      };
      setCoordinators((prev) =>
        prev.some((c) => c.id === newCoordinator.id)
          ? prev.map((c) => (c.id === newCoordinator.id ? newCoordinator : c))
          : [...prev, newCoordinator]
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
        Add Coordinator
      </Button>
      <Table columns={columns} dataSource={coordinators} rowKey="id" />
      <Modal
        title="Coordinator Details"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="profilePhoto" label="Profile Photo">
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="coordinator">Coordinator</Option>
            </Select>
          </Form.Item>
          <Form.Item name="shortIntro" label="Short Intro/Bio">
            <Input.TextArea />
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

export default CoordinatorSettings;
