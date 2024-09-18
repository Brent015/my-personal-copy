import { createFileRoute } from "@tanstack/react-router";
// src/components/settings/Settings.tsx
import BankSettings from "@/components/settings/bank";
import CoordinatorSettings from "@/components/settings/coordinator";
import ProfileSettings from "@/components/settings/profile";
import TransportationSettings from "@/components/settings/transportation";
import { Tabs } from "antd";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/settings")({
  component: Settings,
});

const { TabPane } = Tabs;

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Profile" key="profile">
          <ProfileSettings />
        </TabPane>
        <TabPane tab="Coordinators" key="coordinators">
          <CoordinatorSettings />
        </TabPane>
        <TabPane tab="Transportation" key="transportation">
          <TransportationSettings />
        </TabPane>
        <TabPane tab="Banks" key="banks">
          <BankSettings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Settings;
