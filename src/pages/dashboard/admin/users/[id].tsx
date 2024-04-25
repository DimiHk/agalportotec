import { withAdminAccess } from "@/components/hoc/withAdminAccess";
import { withDashboardLayout } from "@/components/layout";
import { EditUsersPage } from "@/features/admin/users/components/EditUsersPage";
import React from "react";

const AdminUsersDetailsPage = () => {
  return <EditUsersPage />;
};

export default withDashboardLayout(withAdminAccess(AdminUsersDetailsPage));
