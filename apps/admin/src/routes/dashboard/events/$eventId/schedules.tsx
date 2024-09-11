import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  DollarOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Row,
  Select,
  Statistic,
  Table,
  Tag,
} from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import ScheduleCalendar from "@/components/events/schedules-calendar";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface OverallStats {
  totalBookings: number;
  totalRevenue: number;
  completedSchedules: number;
  upcomingSchedules: number;
}

export const Route = createFileRoute("/dashboard/events/$eventId/schedules")({
  component: ScheduleDashboard,
});

const { RangePicker } = DatePicker;
const { Option } = Select;

interface Schedule {
  key: string;
  startDate: Dayjs;
  endDate: Dayjs;
  bookings: number;
  maxCapacity: number;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  revenue: number;
  price: number;
  coordinatorId?: string;
  vehicleId?: string;
}

interface OverallStats {
  totalBookings: number;
  totalRevenue: number;
  completedSchedules: number;
  upcomingSchedules: number;
  ongoingSchedules: number;
  cancelledSchedules: number;
}

function ScheduleDashboard() {
  const initialSchedules: Schedule[] = [
    {
      key: "1",
      startDate: dayjs("2024-09-15"),
      endDate: dayjs("2024-09-18"),
      bookings: 25,
      maxCapacity: 30,
      status: "Upcoming",
      revenue: 12500,
      price: 500,
    },
    {
      key: "2",
      startDate: dayjs("2024-09-20"),
      endDate: dayjs("2024-09-23"),
      bookings: 30,
      maxCapacity: 30,
      status: "Upcoming",
      revenue: 15000,
      price: 500,
    },
    {
      key: "3",
      startDate: dayjs("2024-09-25"),
      endDate: dayjs("2024-09-28"),
      bookings: 28,
      maxCapacity: 30,
      status: "Ongoing",
      revenue: 14000,
      price: 500,
    },
    {
      key: "4",
      startDate: dayjs("2024-10-01"),
      endDate: dayjs("2024-10-04"),
      bookings: 22,
      maxCapacity: 30,
      status: "Upcoming",
      revenue: 11000,
      price: 500,
    },
    {
      key: "5",
      startDate: dayjs("2024-10-05"),
      endDate: dayjs("2024-10-08"),
      bookings: 15,
      maxCapacity: 30,
      status: "Cancelled",
      revenue: 7500,
      price: 500,
    },
  ];

  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const overallStats: OverallStats = {
    totalBookings: schedules.reduce(
      (sum, schedule) => sum + schedule.bookings,
      0
    ),
    totalRevenue: schedules.reduce(
      (sum, schedule) => sum + schedule.revenue,
      0
    ),
    completedSchedules: schedules.filter(
      (schedule) => schedule.status === "Completed"
    ).length,
    upcomingSchedules: schedules.filter(
      (schedule) => schedule.status === "Upcoming"
    ).length,
    ongoingSchedules: schedules.filter(
      (schedule) => schedule.status === "Ongoing"
    ).length,
    cancelledSchedules: schedules.filter(
      (schedule) => schedule.status === "Cancelled"
    ).length,
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsModalVisible(true);
  };

  const handleCancel = (key: string) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.key === key ? { ...schedule, status: "Cancelled" } : schedule
      )
    );
  };

  const handleModalOk = (values: Schedule) => {
    if (editingSchedule) {
      setSchedules(
        schedules.map((schedule) =>
          schedule.key === editingSchedule.key
            ? { ...schedule, ...values }
            : schedule
        )
      );
    }
    setIsModalVisible(false);
    setEditingSchedule(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingSchedule(null);
  };

  const columns: ColumnsType<Schedule> = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: Dayjs) => date.format("MMMM D, YYYY"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: Dayjs) => date.format("MMMM D, YYYY"),
    },
    {
      title: "Bookings",
      dataIndex: "bookings",
      key: "bookings",
      render: (bookings: number, record: Schedule) =>
        `${bookings}/${record.maxCapacity}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Schedule["status"]) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "Ongoing"
                ? "blue"
                : status === "Upcoming"
                  ? "orange"
                  : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue: number) => `₱${revenue.toLocaleString()}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: Schedule) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleCancel(record.key)}
            danger
            disabled={record.status === "Cancelled"}
          />
        </span>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <Card>
            <Statistic
              title="Total Bookings"
              value={overallStats.totalBookings}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={overallStats.totalRevenue}
              prefix={<DollarOutlined />}
              formatter={(value) => `₱${value.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Completed"
              value={overallStats.completedSchedules}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Ongoing"
              value={overallStats.ongoingSchedules}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Upcoming"
              value={overallStats.upcomingSchedules}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Cancelled"
              value={overallStats.cancelledSchedules}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col span={24}>
          <Card title="Schedule Overview">
            <Table<Schedule>
              columns={columns}
              dataSource={schedules}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
      {/* @ts-expect-error - will fix later*/}
      <ScheduleCalendar schedules={schedules} eventName="Event Name" />

      <Modal
        title="Edit Schedule"
        open={isModalVisible}
        onOk={() => {}}
        onCancel={handleModalCancel}
        footer={null}
      >
        {editingSchedule && (
          <Form
            initialValues={{
              ...editingSchedule,
              dateRange: [editingSchedule.startDate, editingSchedule.endDate],
            }}
            onFinish={handleModalOk}
          >
            <Form.Item
              name="dateRange"
              label="Date Range"
              rules={[
                { required: true, message: "Please select the date range" },
              ]}
            >
              <RangePicker />
            </Form.Item>
            <Form.Item
              name="maxCapacity"
              label="Max Capacity"
              rules={[
                { required: true, message: "Please enter the max capacity" },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter the price" }]}
            >
              <InputNumber min={0} prefix="₱" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select the status" }]}
            >
              <Select>
                <Option value="Upcoming">Upcoming</Option>
                <Option value="Ongoing">Ongoing</Option>
                <Option value="Completed">Completed</Option>
                <Option value="Cancelled">Cancelled</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default ScheduleDashboard;
