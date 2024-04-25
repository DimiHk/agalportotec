import { withDashboardLayout } from "@/components/layout";
import { SuppliersPage } from "@/features/suppliers/components/SuppliersPage";
import React from "react";

const Suppliers = () => {
  return <SuppliersPage />;
};

export default withDashboardLayout(Suppliers);
