import { withDashboardLayout } from "@/components/layout";
import { EnterpriseInvoiceDetails } from "@/features/accounting/components/EnterpriseInvoiceDetails";
import { PrivateInvoiceDetails } from "@/features/accounting/components/PrivateInvoiceDetails";
import UpdateInvoiceDetailsProvider from "@/features/accounting/providers/updateInvoicesProvider";
import FileProvider from "@/features/stock/providers/fileProvider";
import { useRouter } from "next/router";
import React from "react";

const InvoiceDetails = () => {
  const router = useRouter();

  const { isEnterprise } = router.query;

  return (
    <React.Fragment>
      {isEnterprise ? (
        <FileProvider>
          <UpdateInvoiceDetailsProvider>
            <EnterpriseInvoiceDetails />
          </UpdateInvoiceDetailsProvider>
        </FileProvider>
      ) : (
        <FileProvider>
          <UpdateInvoiceDetailsProvider>
            <PrivateInvoiceDetails />
          </UpdateInvoiceDetailsProvider>
        </FileProvider>
      )}
    </React.Fragment>
  );
};

export default withDashboardLayout(InvoiceDetails);
