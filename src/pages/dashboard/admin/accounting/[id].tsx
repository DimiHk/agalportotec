import { withAdminAccess } from "@/components/hoc/withAdminAccess";
import { withDashboardLayout } from "@/components/layout";
import { EditInvoicePage } from "@/features/admin/accounting/components/EditInvoicePage";
import React from "react";

const AdminAccountingDetailsPage = () => {
  return <EditInvoicePage />;
};

export default withDashboardLayout(withAdminAccess(AdminAccountingDetailsPage));
