import { withAdminAccess } from "@/components/hoc/withAdminAccess";
import { withDashboardLayout } from "@/components/layout";
import { UsersPage } from "@/features/admin/users/components/UsersPage";
import React from "react";

const AdminUsers = () => {
  return <UsersPage />;
};

export default withDashboardLayout(withAdminAccess(AdminUsers));
