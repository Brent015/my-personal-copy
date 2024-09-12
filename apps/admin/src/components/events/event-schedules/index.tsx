import {
  CalendarOutlined,
  PlusOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Radio,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { Dayjs } from "dayjs";
import React, { useMemo, useState } from "react";
import { AssignmentModal } from "./assignment";
import { CancelModal } from "./cancel-schedule";
import { CollectionModal } from "./collection";
import { EditScheduleModal } from "./edit-schedule";
import OverallStatsComponent from "./overall-stats";
import { ScheduleTable } from "./schedule-table";
import { sampleOverallStats } from "./types";
import { useScheduleActions } from "./useScheduleActions";
import { useSchedules } from "./useSchedules";
import { ScheduleCalendar } from "./schedule-calendar";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const EventSchedulesDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const { schedules, loading, error } = useSchedules();
  const {
    editingSchedule,
    isEditModalVisible,
    isCollectionModalVisible,
    isAssignmentModalVisible,
    isCancelModalVisible,
    handleEdit,
    handleCollection,
    handleAssignment,
    handleCancel,
    handleEditModalOk,
    handleCollectionModalOk,
    handleAssignmentModalOk,
    handleCancelModalOk,
    closeModals,
  } = useScheduleActions();

  const filteredSchedules = useMemo(() => {
    return schedules.filter(
      (schedule) =>
        !dateRange ||
        (schedule.startDate.isAfter(dateRange[0]) &&
          schedule.endDate.isBefore(dateRange[1]))
    );
  }, [schedules, dateRange]);

  return (
    <div className="p-4 space-y-6">
      <Breadcrumb
        className="text-md"
        items={[
          { title: <Link to="/dashboard/events">Events</Link> },
          {
            title: (
              <Link to="/dashboard/events/$eventId" params={{ eventId: "1" }}>
                Bali Adventure Retreat
              </Link>
            ),
          },
          {
            title: (
              <Link
                to="/dashboard/events/$eventId/schedules"
                params={{ eventId: "1" }}
                className="text-slate-800"
              >
                Schedules
              </Link>
            ),
          },
        ]}
      />

      {/* <Title level={2} className="mb-6">
        Event Schedules
      </Title> */}

      <OverallStatsComponent stats={sampleOverallStats} />
      <Card className="shadow-md">
        <Row gutter={[16, 16]} className="mb-4 items-center">
          <Col xs={24} md={12}>
            <RangePicker
              className="w-full"
              onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs] | null)}
            />
          </Col>
          <Col xs={24} md={12} className="text-right">
            <Radio.Group
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="table">
                <TableOutlined /> Table
              </Radio.Button>
              <Radio.Button value="calendar">
                <CalendarOutlined /> Calendar
              </Radio.Button>
            </Radio.Group>
          </Col>
        </Row>

        {loading ? (
          <div className="animate-pulse">
            {/* Add skeleton loading UI here */}
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : viewMode === "table" ? (
          <ScheduleTable
            schedules={filteredSchedules}
            onEdit={handleEdit}
            onCollection={handleCollection}
            onAssignment={handleAssignment}
            onCancel={handleCancel}
          />
        ) : (
          <ScheduleCalendar
            onScheduleClick={() => {}}
            schedules={filteredSchedules}
          />
        )}
      </Card>

      <EditScheduleModal
        schedule={editingSchedule}
        visible={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={closeModals}
      />

      <CollectionModal
        schedule={editingSchedule}
        visible={isCollectionModalVisible}
        onOk={handleCollectionModalOk}
        onCancel={closeModals}
      />

      <AssignmentModal
        schedule={editingSchedule}
        visible={isAssignmentModalVisible}
        onOk={handleAssignmentModalOk}
        onCancel={closeModals}
      />

      <CancelModal
        schedule={editingSchedule}
        visible={isCancelModalVisible}
        onOk={handleCancelModalOk}
        onCancel={closeModals}
      />

      {/* <AddScheduleModal
        visible={isAddModalVisible}
        onOk={(newSchedule) => {
          // Implement add new schedule functionality
          console.log("New schedule added:", newSchedule);
          setIsAddModalVisible(false);
        }}
        onCancel={() => setIsAddModalVisible(false)}
      /> */}

      <Tooltip title="Add new schedule">
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
          className="fixed bottom-8 right-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          onClick={() => setIsAddModalVisible(true)}
        />
      </Tooltip>
    </div>
  );
};

export default EventSchedulesDashboard;
