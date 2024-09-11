import { Button, Space } from "antd";
import React from "react";

interface EventFormHeaderProps {
  eventName: string;
  onBack: () => void;
  onSave: () => void;
  onReset: () => void;
  isDirty: boolean;
}

const EventFormHeader: React.FC<EventFormHeaderProps> = ({
  onSave,
  onReset,
  isDirty,
}) => (
  <header className="flex mb-4 bg-white py-4 px-2 justify-end">
    <Space>
      <Button onClick={onReset}>Reset Changes</Button>
      <Button type="primary" onClick={onSave} disabled={!isDirty}>
        Save Changes
      </Button>
    </Space>
  </header>
);

export default EventFormHeader;
