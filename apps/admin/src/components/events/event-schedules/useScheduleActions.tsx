import { useState } from "react";
import { message } from "antd";
import { Schedule } from "./types";

export const useScheduleActions = (initialSchedules: Schedule[] = []) => {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCollectionModalVisible, setIsCollectionModalVisible] =
    useState(false);
  const [isAssignmentModalVisible, setIsAssignmentModalVisible] =
    useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsEditModalVisible(true);
  };

  const handleCollection = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsCollectionModalVisible(true);
  };

  const handleAssignment = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsAssignmentModalVisible(true);
  };

  const handleCancel = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsCancelModalVisible(true);
  };

  const handleAddSchedule = () => {
    setIsAddModalVisible(true);
  };

  const handleEditModalOk = (updatedSchedule: Schedule) => {
    setSchedules(
      schedules.map((s) => (s.id === updatedSchedule.id ? updatedSchedule : s))
    );
    message.success("Schedule updated successfully");
    setIsEditModalVisible(false);
  };

  const handleCollectionModalOk = (amount: number) => {
    if (editingSchedule) {
      const updatedSchedule = {
        ...editingSchedule,
        paid: editingSchedule.paid + amount,
        toCollect: editingSchedule.toCollect - amount,
      };
      setSchedules(
        schedules.map((s) =>
          s.id === updatedSchedule.id ? updatedSchedule : s
        )
      );
      message.success(`Payment of ${amount} collected`);
    }
    setIsCollectionModalVisible(false);
  };

  const handleAssignmentModalOk = (
    coordinatorId: string,
    vehicleId: string
  ) => {
    if (editingSchedule) {
      const updatedSchedule = { ...editingSchedule, coordinatorId, vehicleId };
      setSchedules(
        schedules.map((s) =>
          s.id === updatedSchedule.id ? updatedSchedule : s
        )
      );
      message.success("Coordinator and vehicle assigned successfully");
    }
    setIsAssignmentModalVisible(false);
  };

  const handleCancelModalOk = () => {
    if (editingSchedule) {
      const updatedSchedule: Schedule = {
        ...editingSchedule,
        status: "Cancelled",
        // Include all other properties of Schedule type here
        // If any property is optional and might not exist on editingSchedule, provide a default value
        color: editingSchedule.color || "#000000", // Provide a default color if it's optional
        coordinatorId: editingSchedule.coordinatorId || undefined,
        vehicleId: editingSchedule.vehicleId || undefined,
        // Add any other properties that might be missing
      };
      setSchedules(
        schedules.map((s) =>
          s.id === updatedSchedule.id ? updatedSchedule : s
        )
      );
      message.success("Schedule cancelled successfully");
    }
    setIsCancelModalVisible(false);
  };

  const handleAddModalOk = (newSchedule: Omit<Schedule, "id">) => {
    const scheduleWithId = { ...newSchedule, id: Date.now().toString() };
    setSchedules([...schedules, scheduleWithId]);
    message.success("New schedule added successfully");
    setIsAddModalVisible(false);
  };

  const closeModals = () => {
    setIsEditModalVisible(false);
    setIsCollectionModalVisible(false);
    setIsAssignmentModalVisible(false);
    setIsCancelModalVisible(false);
    setIsAddModalVisible(false);
    setEditingSchedule(null);
  };

  return {
    schedules,
    editingSchedule,
    isEditModalVisible,
    isCollectionModalVisible,
    isAssignmentModalVisible,
    isCancelModalVisible,
    isAddModalVisible,
    handleEdit,
    handleCollection,
    handleAssignment,
    handleCancel,
    handleAddSchedule,
    handleEditModalOk,
    handleCollectionModalOk,
    handleAssignmentModalOk,
    handleCancelModalOk,
    handleAddModalOk,
    closeModals,
  };
};
