import {
  BellOutlined,
  CalendarOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Button, ConfigProvider, Flex, Layout, Menu, Space, theme } from "antd";
import { useState } from "react";
import styles from "./styles.module.css";

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "/dashboard/events",
    icon: <CalendarOutlined />,
    label: (
      <Link
        to="/dashboard/events"
        search={{
          activeFilter: ["true"],
          sortField: "earnings",
          sortOrder: "descend",
        }}
      >
        Events
      </Link>
    ),
  },
  {
    key: "/dashboard/wallet",
    icon: <WalletOutlined />,
    label: <Link to="/dashboard/wallet">Wallet</Link>,
  },
  {
    key: "/dashboard/settings",
    icon: <SettingOutlined />,
    label: <Link to="/dashboard/settings">Settings</Link>,
  },
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const {
    token: { screenXLMax, paddingMD },
  } = theme.useToken();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // Custom theme for Ant Design
  const customTheme = {
    components: {
      Menu: {
        // itemSelectedColor: "#ffffff",
      },
    },
  };

  return (
    <ConfigProvider theme={customTheme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          className={styles.layoutSider}
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          onBreakpoint={(broken) => {
            setCollapsed(broken);
          }}
        >
          <Menu
            // theme="dark"
            style={{ borderInlineEnd: "none" }}
            mode="inline"
            selectedKeys={[
              menuItems.find((item) => pathname === item.key)?.key ?? "",
            ]}
            items={menuItems.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
            }))}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              paddingRight: paddingMD,
              background: "transparent",
            }}
          >
            <Flex justify="space-between">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggle}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <Space size={"middle"}>
                <Button icon={<BellOutlined />}></Button>
                <Link to="/dashboard/create">
                  <Button type="primary">Create Event</Button>
                </Link>
              </Space>
            </Flex>
          </Header>
          <Content
            style={{
              padding: 24,
              minHeight: 280,
            }}
          >
            <div style={{ maxWidth: screenXLMax, margin: "0 auto" }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayout;
