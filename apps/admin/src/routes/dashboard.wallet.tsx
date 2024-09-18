import { createFileRoute } from "@tanstack/react-router";

import { WalletOverview, WithdrawModal } from "@/components/wallet";
import WalletTransactionsTable from "@/components/wallet/transactions-table";
import TravelCoinsTransactionsTable from "@/components/wallet/travelcoins-table";
import { Button, Card, Tabs, Typography } from "antd";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/wallet")({
  component: WalletPage,
});

const { TabPane } = Tabs;
const { Title } = Typography;

function WalletPage() {
  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState(false);

  const showWithdrawModal = () => {
    setIsWithdrawModalVisible(true);
  };

  const handleWithdrawModalClose = () => {
    setIsWithdrawModalVisible(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Wallet</Title>
        <Button type="primary" onClick={showWithdrawModal}>
          Withdraw Funds
        </Button>
      </div>

      <WalletOverview />

      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Wallet Transactions" key="1">
            <WalletTransactionsTable />
          </TabPane>
          <TabPane tab="TravelCoins Transactions" key="2">
            <TravelCoinsTransactionsTable />
          </TabPane>
        </Tabs>
      </Card>

      <WithdrawModal
        visible={isWithdrawModalVisible}
        onClose={handleWithdrawModalClose}
      />
    </div>
  );
}

export default WalletPage;
