import { withDashboardLayout } from "@/components/layout";
import { EnterpriseClientDetailsPage } from "@/features/client/components/EnterpriseClientDetailsPage";
import { PrivateClientDetailsPage } from "@/features/client/components/PrivateClientDetailsPage";
import { useRouter } from "next/router";
import React from "react";

const ClientDetails = () => {
  const router = useRouter();
  const { isEnterprise } = router.query;

  return (
    <React.Fragment>
      {isEnterprise ? (
        <EnterpriseClientDetailsPage />
      ) : (
        <PrivateClientDetailsPage />
      )}
    </React.Fragment>
  );
};

export default withDashboardLayout(ClientDetails);
