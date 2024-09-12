import { useState } from "react";
import { message } from "antd";
import { Schedule } from "./types";

export const useScheduleActions = () => {
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCollectionModalVisible, setIsCollectionModalVisible] =
    useState(false);
  const [isAssignmentModalVisible, setIsAssignmentModalVisible] =
    useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

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

  const handleEditModalOk = (updatedSchedule: Schedule) => {
    // Implement the logic to update the schedule
    console.log("Updating schedule:", updatedSchedule);
    message.success("Schedule updated successfully");
    setIsEditModalVisible(false);
  };

  const handleCollectionModalOk = (amount: number) => {
    // Implement the logic to process the collection
    console.log("Collecting payment:", amount);
    message.success(`Payment of ${amount} collected`);
    setIsCollectionModalVisible(false);
  };

  const handleAssignmentModalOk = (
    coordinatorId: string,
    vehicleId: string
  ) => {
    // Implement the logic to assign coordinator and vehicle
    console.log("Assigning coordinator and vehicle:", coordinatorId, vehicleId);
    message.success("Coordinator and vehicle assigned successfully");
    setIsAssignmentModalVisible(false);
  };

  const handleCancelModalOk = (reason: string) => {
    // Implement the logic to cancel the schedule
    console.log("Cancelling schedule:", editingSchedule?.id, "Reason:", reason);
    message.success("Schedule cancelled successfully");
    setIsCancelModalVisible(false);
  };

  const closeModals = () => {
    setIsEditModalVisible(false);
    setIsCollectionModalVisible(false);
    setIsAssignmentModalVisible(false);
    setIsCancelModalVisible(false);
    setEditingSchedule(null);
  };

  return {
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
  };
};
