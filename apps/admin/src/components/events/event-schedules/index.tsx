import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  DollarOutlined,
  EditOutlined,
  PlusOutlined,
  TableOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Calendar,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Statistic,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

import "./styles.css";

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

interface Schedule {
  key: string;
  eventName: string;
  startDate: Dayjs;
  endDate: Dayjs;
  bookings: number;
  maxCapacity: number;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  revenue: number;
}

function EventSchedulesDashboard() {
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Sample data - replace with actual data fetching logic
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      key: "1",
      eventName: "Summer Beach Party",
      startDate: dayjs("2024-09-15"),
      endDate: dayjs("2024-09-18"),
      bookings: 25,
      maxCapacity: 30,
      status: "Upcoming",
      revenue: 12500,
    },
    {
      key: "2",
      eventName: "Summer Beach Party",
      startDate: dayjs("2024-09-19"),
      endDate: dayjs("2024-09-27"),
      bookings: 24,
      maxCapacity: 31,
      status: "Upcoming",
      revenue: 1250320,
    },
    // ... add more sample schedules ...
  ]);

  const filteredSchedules = useMemo(() => {
    return schedules.filter(
      (schedule) =>
        schedule.eventName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!dateRange ||
          (schedule.startDate.isAfter(dateRange[0]) &&
            schedule.endDate.isBefore(dateRange[1])))
    );
  }, [schedules, searchTerm, dateRange]);

  const overallStats = useMemo(
    () => ({
      totalBookings: filteredSchedules.reduce(
        (sum, schedule) => sum + schedule.bookings,
        0
      ),
      totalRevenue: filteredSchedules.reduce(
        (sum, schedule) => sum + schedule.revenue,
        0
      ),
      completedSchedules: filteredSchedules.filter(
        (schedule) => schedule.status === "Completed"
      ).length,
      ongoingSchedules: filteredSchedules.filter(
        (schedule) => schedule.status === "Ongoing"
      ).length,
      upcomingSchedules: filteredSchedules.filter(
        (schedule) => schedule.status === "Upcoming"
      ).length,
      cancelledSchedules: filteredSchedules.filter(
        (schedule) => schedule.status === "Cancelled"
      ).length,
    }),
    [filteredSchedules]
  );

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

  const handleModalOk = (values: any) => {
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

  const columns: ColumnsType<Schedule> = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: Dayjs) => date.format("MMMM D, YYYY"),
      sorter: (a, b) => a.startDate.unix() - b.startDate.unix(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: Dayjs) => date.format("MMMM D, YYYY"),
      sorter: (a, b) => a.endDate.unix() - b.endDate.unix(),
    },
    {
      title: "Bookings",
      dataIndex: "bookings",
      key: "bookings",
      render: (bookings: number, record: Schedule) => (
        <Tooltip title={`${bookings}/${record.maxCapacity}`}>
          {bookings} / {record.maxCapacity}
        </Tooltip>
      ),
      sorter: (a, b) => a.bookings - b.bookings,
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
      filters: [
        { text: "Upcoming", value: "Upcoming" },
        { text: "Ongoing", value: "Ongoing" },
        { text: "Completed", value: "Completed" },
        { text: "Cancelled", value: "Cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue: number) => `₱${revenue.toLocaleString()}`,
      sorter: (a, b) => a.revenue - b.revenue,
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
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={4}>
          <Card>
            <Statistic
              title="Total Bookings"
              value={overallStats.totalBookings}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={overallStats.totalRevenue}
              prefix={<DollarOutlined />}
              formatter={(value) => `₱${value.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card>
            <Statistic
              title="Completed"
              value={overallStats.completedSchedules}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card>
            <Statistic
              title="Ongoing"
              value={overallStats.ongoingSchedules}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card>
            <Statistic
              title="Upcoming"
              value={overallStats.upcomingSchedules}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card>
            <Statistic
              title="Cancelled"
              value={overallStats.cancelledSchedules}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} md={8}>
          <Search
            placeholder="Search events"
            onSearch={(value) => setSearchTerm(value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} md={8}>
          <RangePicker
            style={{ width: "100%" }}
            onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs] | null)}
          />
        </Col>
        <Col xs={24} md={8} className="text-right">
          <Radio.Group
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <Radio.Button value="table">
              <TableOutlined />
            </Radio.Button>
            <Radio.Button value="calendar">
              <CalendarOutlined />
            </Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

      {viewMode === "table" ? (
        <Table<Schedule>
          size="small"
          columns={columns}
          dataSource={filteredSchedules}
          rowKey="key"
          pagination={false}
          showSorterTooltip={{ target: "sorter-icon" }}
        />
      ) : (
        <Calendar
          cellRender={(date) => {
            const schedulesForDate = filteredSchedules.filter(
              (schedule) =>
                date.isSameOrAfter(schedule.startDate, "day") &&
                date.isSameOrBefore(schedule.endDate, "day")
            );
            return (
              <ul className="events">
                {schedulesForDate.map((schedule, index) => (
                  <li key={index}>
                    <Tooltip
                      title={`${schedule.eventName} (${schedule.bookings}/${schedule.maxCapacity})`}
                    >
                      <Tag
                        color={
                          schedule.status === "Completed"
                            ? "green"
                            : schedule.status === "Ongoing"
                              ? "blue"
                              : schedule.status === "Upcoming"
                                ? "orange"
                                : "red"
                        }
                      >
                        {schedule.eventName}
                      </Tag>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            );
          }}
        />
      )}

      {/* <ScheduleSummary schedules={filteredSchedules} /> */}

      <Modal
        title="Edit Schedule"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
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
              <RangePicker />
            </Form.Item>
            <Form.Item
              name="maxCapacity"
              label="Max Capacity"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="Upcoming">Upcoming</Option>
                <Option value="Ongoing">Ongoing</Option>
                <Option value="Completed">Completed</Option>
                <Option value="Cancelled">Cancelled</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="revenue"
              label="Revenue"
              rules={[{ required: true }]}
            >
              <InputNumber
                formatter={(value) =>
                  `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value!.replace(/₱\s?|(,*)/g, "")}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Tooltip title="Add new schedule">
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
          className="fixed bottom-8 right-8"
          onClick={() => {
            setEditingSchedule(null);
            setIsModalVisible(true);
          }}
        />
      </Tooltip>
    </div>
  );
}

export default EventSchedulesDashboard;
