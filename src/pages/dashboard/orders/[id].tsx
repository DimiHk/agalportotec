import { withDashboardLayout } from "@/components/layout";
import { EnterpriseDetailOrder } from "@/features/orders/components/EnterpriseOrderDetail";
import { PrivateDetailOrder } from "@/features/orders/components/PrivateDetailOrder";
import { useRouter } from "next/router";
import React from "react";

const ClientDetails = () => {
  const router = useRouter();
  const { isEnterprise } = router.query;

  return (
    <React.Fragment>
      {isEnterprise ? <EnterpriseDetailOrder /> : <PrivateDetailOrder />}
    </React.Fragment>
  );
};

export default withDashboardLayout(ClientDetails);
