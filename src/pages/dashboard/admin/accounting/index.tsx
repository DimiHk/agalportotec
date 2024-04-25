import { withAdminAccess } from "@/components/hoc/withAdminAccess";
import { withDashboardLayout } from "@/components/layout";
import { AccountingInvoicesPage } from "@/features/admin/accounting/components/InvoicesPage";
import React from "react";

const AdminAccounting = () => {
  return <AccountingInvoicesPage />;
};

export default withDashboardLayout(withAdminAccess(AdminAccounting));
