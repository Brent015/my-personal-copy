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
  { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  {
    key: "/dashboard/events",
    icon: <CalendarOutlined />,
    label: "Events",
  },
  { key: "/dashboard/wallet", icon: <WalletOutlined />, label: "Wallet" },
  { key: "/dashboard/settings", icon: <SettingOutlined />, label: "Settings" },
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

  console.log(pathname, [
    menuItems.find((item) => pathname.indexOf(item.key) > -1)?.key ?? "",
  ]);

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
              label: <Link to={item.key}>{item.label}</Link>,
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
